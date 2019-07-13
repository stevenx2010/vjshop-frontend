import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { VJAPI } from '../../../services/vj.services';

import { CustomerProfile } from '../../../models/customer-profile.model';

@Component({
  selector: 'app-customer-query',
  templateUrl: './customer-query.component.html',
  styleUrls: ['./customer-query.component.css']
})
export class CustomerQueryComponent implements OnInit {
  form: FormGroup;
  date1: Date = new Date();
  date2: Date = new Date();

  settings = {
	  bigBanner: false,
	  timePicker: true,
	  format: 'yyyy-MM-dd',
	  defaultOpen: false,
  }

  dp: DatePipe = new DatePipe('en_US');

  queryByDate: boolean = false;

  profiles: CustomerProfile[] = [];
  totalRecords: number = 0;

  constructor(private fb: FormBuilder, private vjApi: VJAPI) { 

  }

  ngOnInit() {
  	this.form = this.fb.group({
  		mobile: ['', Validators.compose([Validators.pattern('^1[0-9]{10}$')])],
  	});
  }

  checkboxSelected(event) {
    this.queryByDate = !this.queryByDate;
    console.log(this.queryByDate);
  }

  prepareQueryData() {

  	let body = {
		'mobile': this.form.controls.mobile.value ? this.form.controls.mobile.value : '',
  		'query_by_date': this.queryByDate,
  		'date1': this.dp.transform(this.date1, 'yyyy-MM-dd 00:00:00'),
  		'date2': this.dp.transform(this.date2, 'yyyy-MM-dd 23:59:59')
  	}

  	return body;
  }

  query() {
  	this.profiles = [];
  	this.totalRecords = 0;
  	let body = this.prepareQueryData();

  	this.vjApi.getCustomerProfile(body).subscribe((data) => {
  		console.log(data);
  		if(data.length > 0) {
  			this.profiles = data;
  			this.totalRecords = data.length;
  		}
  	});
  }
}
