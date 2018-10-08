
import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { VJAPI } from '../../../services/vj.services';
import { User } from '../../../models/user.model';
import { API_BASE_URL } from '../../../models/constants';
import { Md5 } from 'md5-typescript';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.css']
})
export class CreateNewUserComponent implements OnInit {
  @ViewChild('preview') preview: ElementRef;
  
  @Input() user: User;
  @Output() canceled = new EventEmitter<number>(); // 1: canceled, 2: saved

  form: FormGroup;
  imageFile: File;
  image: any;
  image_url: string;
  userId: number;
  baseUrl: string;

  passwordMatches: boolean = false; 

  caption: string = '创建新用户';
  formFunction: string = 'add';

  checkboxChecked: boolean = false;

  error: string = ' ';
  displayError: boolean = false;
  emailNotUniqueError: boolean = false;

  constructor(private fb: FormBuilder, private vjApi: VJAPI, private renderer: Renderer2,
  				private router: Router, private actRoute: ActivatedRoute) { 
  	this.baseUrl = API_BASE_URL;
  }

  ngOnInit() {
  	this.form = this.fb.group({
  		username: ['', Validators.compose([Validators.maxLength(15), Validators.minLength(5), 
  					Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9]+$')])],
  		mobile: ['', Validators.compose([Validators.required, Validators.pattern('^1[0-9]{10}$')])],
  		email: ['', Validators.compose([Validators.required, Validators.email])],
  		password: ['', Validators.compose([Validators.maxLength(6), Validators.minLength(6),
  					Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])],
  		confirm_password: ['', Validators.compose([Validators.maxLength(6), Validators.minLength(6),
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

  	if(this.user) {
  		this.caption = '编辑用户';
  		this.formFunction = 'edit';

  		this.form.controls.username.setValue(this.user.name);
  		this.form.controls.mobile.setValue(this.user.mobile);
  		this.form.controls.email.setValue(this.user.email);
  		this.form.controls.password.setValue(this.user.password);
  		this.form.controls.confirm_password.setValue(this.user.password);

  		this.image_url = this.user.image_url;
  		this.userId = this.user.id;
  	}
  }

  submit() {
  	let body = new FormData();
    let password = Md5.init(this.form.get('password').value);

  	body.append('username', this.form.get('username').value);
  	body.append('mobile', this.form.get('mobile').value);
  	body.append('email', this.form.get('email').value.trim());
  	body.append('password', password);
  	if(this.image_url) {
  		body.append('image_url', this.image_url);
  	} else {
  		body.append('image', this.imageFile);
  	}

  	if(this.userId) {
  		body.append('id', this.userId + '');
  	}



  	console.log(body);
  	
  	this.vjApi.updateUser(body).subscribe((resp) => {
  		console.log(resp);
  		this.canceled.emit(2);
  	}, (err) => {
  		this.error = err;
  		this.displayError = true;
  	})
  }

  previewImage(event) {
  	//remove previous selected image
  	if(this.image) {
  		this.renderer.removeChild(this.preview.nativeElement, this.image);
  		this.image = null;
  		this.imageFile = null;
  	}

  	if(event.target.files && event.target.files.length > 0) {
  		this.imageFile = event.target.files[0];

  		let img = this.renderer.createElement('img');
  		this.renderer.setAttribute(img, 'src', URL.createObjectURL(this.imageFile));
  		this.renderer.setProperty(img, 'width', '200');
  		this.renderer.appendChild(this.preview.nativeElement, img);
  		this.image = img;
  	}
  }

  doCancel() {
  	this.canceled.emit(1);
  }

  checked() {
  	this.checkboxChecked = !this.checkboxChecked;
  	if(this.checkboxChecked) {
  		this.form.controls.password.setValue('A1234a');
  		this.form.controls.confirm_password.setValue('A1234a');
  	} else {
  		this.form.controls.password.setValue('');
  		this.form.controls.confirm_password.setValue('');
  	}
  }

  emailInputted() {
    let email: string = this.form.get('email').value;

    this.vjApi.checkEmailUnique(email.trim()).subscribe((resp) => {
      let result = resp.json();

      if(result.status == 0) {

        this.emailNotUniqueError = true;
      } else {
        this.emailNotUniqueError = false;
      }
    });
  }
}
