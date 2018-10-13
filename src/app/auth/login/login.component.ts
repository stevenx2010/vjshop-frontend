import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { VJAPI } from '../../../services/vj.services';
import { Md5 } from 'md5-typescript';
import { User } from '../../../models/user.model';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() login = new EventEmitter<boolean>();

  user: User;
  form: FormGroup;
  passwordMatches: boolean = false;
  api_token:string;

  displayResetPassword: boolean = false;
  userId: number;

  displayError: boolean = false;

  constructor(private fb: FormBuilder, private vjApi: VJAPI, private cs: CookieService, private router: Router, private actRoute: ActivatedRoute) { 
    this.user = new User();
  }

  ngOnInit() {

  	this.form = this.fb.group({
  		email: ['', Validators.compose([Validators.required, Validators.email])],
  		password: ['', Validators.compose([Validators.maxLength(12), Validators.minLength(6),
  					Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])]
  	});

    this.form.valueChanges.subscribe((f) => {
      this.displayError = false;

    })
  }

  submit() {
  	let body = new FormData();
    let password = Md5.init(this.form.get('password').value);

  	body.append('email', this.form.get('email').value);
  	body.append('password', password);
 	
    this.vjApi.login(body).subscribe((resp) => {

      let result = resp.json();
      if(result.length > 0) {  // Valid user
        this.user = result[0];
        this.userId = this.user.id;

        this.api_token = this.user.api_token
        this.cs.set('token', this.api_token);

        this.cs.set('username', this.user.name);
        this.cs.set('last_login', this.user.last_login);
        this.cs.set('image_url', this.user.image_url);
        this.cs.set('roles', this.user.roles + '');
        this.cs.set('email', this.user.email);

        if(this.user.first_login) {
          this.displayResetPassword = true;
        } else {

          this.login.emit(true);
          this.router.navigate(['home']);
        }
      } else {
        this.displayError = true;
      }
    });
  }

  resetStatus(event) {
    if(event) {
      this.displayResetPassword = false;
      this.login.emit(true);
      this.router.navigate(['home']);
    }
  }
}
