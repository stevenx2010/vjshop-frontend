import { Component, OnInit } from '@angular/core';

import { VJAPI } from '../../../services/vj.services';

@Component({
  selector: 'app-agreement-page',
  templateUrl: './agreement-page.component.html',
  styleUrls: ['./agreement-page.component.css']
})
export class AgreementPageComponent implements OnInit {
  agreement: string;
  btnSaveDisabled: boolean = true;
  contentChanged: boolean = false;

  constructor(private vjApi: VJAPI) { 

  }

  ngOnInit() {
  	this.loadAgreement();
  }

  loadAgreement() {
  	this.vjApi.getAgreement().subscribe((info) => {
  		let temp = info.json();

  		if(temp) {
  			this.agreement = temp;
  		}
  	}, (err) => {
  		console.log(err);
  	});  	
  }

  onChange() {
  	this.btnSaveDisabled = false;
  	this.contentChanged = true;
  }

  clearContent() {
  	this.agreement = '';
  	this.contentChanged = false;
  	this.btnSaveDisabled = true;
  }

  reload() {
  	this.loadAgreement();
  	this.contentChanged = false;
  	this.btnSaveDisabled = true;
  }

  save() {
  	this.btnSaveDisabled = true;
  	let body = this.prepareData();

  	this.vjApi.updateAgreement(body).subscribe((r) => {
  		console.log(r);
  	}, (err) => console.log(err));
  }

  prepareData() {
  	let body = new FormData();

  	body.append('agreement', this.agreement);

  	return body;
  }
}
