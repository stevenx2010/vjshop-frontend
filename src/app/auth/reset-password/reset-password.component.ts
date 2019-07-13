import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VJAPI } from '../../../services/vj.services';
import { Md5 } from 'md5-typescript';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  @Input() userid: number;
  @Output() reset = new EventEmitter<boolean>();

  form: FormGroup;
  passwordMatches: boolean = false; 

  constructor(private fb: FormBuilder, private vjApi: VJAPI) { 
  }

  ngOnInit() {
  	this.form = this.fb.group({
  		password: ['', Validators.compose([Validators.maxLength(12), Validators.minLength(6),
  					Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])],
  		confirm_password: ['', Validators.compose([Validators.maxLength(12), Validators.minLength(6),
  					Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])],
  	});

  	this.form.valueChanges.subscribe((form) => {
  		if(form) {
  			if(form.password === form.confirm_password) {
  				this.passwordMatches = true;
  				return this.passwordMatches;
  				
  			} else {
  				return this.passwordMatches = false;
  			}
  		}
  	});
  }

  submit() {
  	let body = new FormData();
  	if(this.userid) {
  		body.append('user_id', this.userid +'');
  		let password = Md5.init(this.form.get('password').value);
  		body.append('password', password);

  		this.vjApi.updatePassword(body).subscribe((resp)=> {
  			console.log(resp);
  			this.reset.emit(true);
  		})
  	}
  }

}
