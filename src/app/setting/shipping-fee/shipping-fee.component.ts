import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Setting } from '../../../models/setting.model';
import { VJAPI } from '../../../services/vj.services';
import { SettingType } from '../../../models/constants';

@Component({
  selector: 'app-shipping-fee',
  templateUrl: './shipping-fee.component.html',
  styleUrls: ['./shipping-fee.component.css']
})
export class ShippingFeeComponent implements OnInit {
  form: FormGroup;
  settings: Setting[];
  id: number;
  selectedItem: number;

  displayForm: boolean = false;

  constructor(private fb: FormBuilder, private vjApi: VJAPI) { }

  ngOnInit() {
  	this.form = this.fb.group({
  		description: ['', Validators.required],
  		formula: ['(w-m)*p', Validators.required],
  		parameter1: [10, Validators.required],
  		parameter2: [1.00, Validators.required],
  		condition1: [0, Validators.required],
  		condition2: [10000, Validators.required]
  	});

  	this.getAllShippingSettings();
  }

  getAllShippingSettings() {
   	this.vjApi.getShippingSettingsAll().subscribe((s) => {
  		let temp = s.json();
  		if(temp && temp.length > 0) {
  			this.settings = temp;
  		}
  	}); 	
  }

  submit() {
  	let body = new FormData();

  	if(this.id) {
  		body.append('id', this.id + '');
  	}

  	body.append('type', SettingType.SHIPPING_FEE_FORMULA + '');
  	body.append('description', this.form.get('description').value);
  	body.append('setting_name', 'shipping_fee');
  	body.append('setting_value', this.form.get('formula').value);
  	body.append('setting_value_postfix', this.postfixConvert());
  	body.append('parameter1', this.form.get('parameter1').value);
  	body.append('parameter2', this.form.get('parameter2').value);
  	body.append('condition1', this.form.get('condition1').value);
  	body.append('condition2', this.form.get('condition2').value);

  	this.vjApi.updateShippingSettings(body).subscribe((resp) => {
  		if(resp.json()) {
  			let s = resp.json();
  			this.id = s.id;

  			this.getAllShippingSettings();

  			this.displayForm = false;
  		}
  	})
  }

  postfixConvert() {
  	let exp = this.form.get('formula').value;
  	let postfix: string = '';
  	let operator = [];
  	let temp: string = '';

  	for(let c of exp) {
  		console.log(c);
  		switch(c) {
  			case ' ':
  				break;
  			case '(':
  				operator.push(c);
  				break;
  			case  '+':
  				operator.push(c);
  				break;
  			case  '-':
  				operator.push(c);
  				break;
  			case  '*':
  				operator.push(c);
  				break;
  			case  '/':
  				operator.push(c);
  				break;
  			case ')':
  				while((temp = operator.pop()) != '(') {
  					postfix += temp;
  				}
  				break;
  			default:
  				postfix += c;
  				break;
  		}
  	}

  	for(let i = 0; i < operator.length; i++) postfix += operator.pop();
  	return postfix;
  }

  edit(index) {
  	this.selectedItem = index;
  	this.displayForm = true;

  	this.id = this.settings[index].id;

  	this.form.controls.description.setValue(this.settings[index].description);
  	this.form.controls.formula.setValue(this.settings[index].setting_value);
  	this.form.controls.parameter1.setValue(this.settings[index].parameter1);
  	this.form.controls.parameter2.setValue(this.settings[index].parameter2);
  	this.form.controls.condition1.setValue(this.settings[index].condition1);
  	this.form.controls.condition2.setValue(this.settings[index].condition2);
  }

  delete(index) {
  	this.selectedItem = index;
  }

  deleteConfirmed() {
  	this.vjApi.deleteShippingSettingById(this.settings[this.selectedItem].id).subscribe((resp) => {
  		this.getAllShippingSettings();
  	});
  }

  cancel() {
  	this.displayForm = false;
  }

  add() {
  	this.displayForm = true;
  }
}
