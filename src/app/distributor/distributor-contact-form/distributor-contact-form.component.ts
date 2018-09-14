import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { VJAPI } from '../../../services/vj.services';
import { TelAreaCode } from '../../../models/chinese-tel-area-code';

@Component({
  selector: 'app-distributor-contact-form',
  templateUrl: './distributor-contact-form.component.html',
  styleUrls: ['./distributor-contact-form.component.css']
})
export class DistributorContactFormComponent implements OnInit {

  form: FormGroup;
  areaCode: any[];
  isDefaultContact: boolean = true;
  distributorId: number;

  sub: any;
  code: string;

  constructor(private fb: FormBuilder, private actRoute: ActivatedRoute, private router: Router, private vjApi: VJAPI) { 
  	this.areaCode = new Array<any>();

  	this.areaCode = TelAreaCode.areaCode;


/*
  	this.areaCode.sort((a, b) => {
  		if(Number(a.value) > Number(b.value)) return 1;
  		if(Number(a.value) < Number(b.value)) return -1;
  		return 0;
  	})*/

  	console.log(this.areaCode);
  }

  ngOnInit() {
    this.sub = this.actRoute.params.subscribe((params) => {
  		this.distributorId = +params['id'];
  	});

    console.log(this.distributorId);

  	this.form = this.fb.group({
  		name: ['', Validators.required],
  		mobile: ['', Validators.compose([Validators.required, Validators.pattern('^1[0-9]{10}$')])],
  		phoneAreaCode: [''],
  		tel: ['', Validators.pattern('^[1-9][0-9]{7}$')]
  	});
  }

  ngOnDestroy() {
  	this.sub.unsubscribe();
  }

  onChkBoxChange(event) {
  	this.isDefaultContact = event.target.checked;
  }

  selectCode(event) {
  	this.code =  event.target.value;
  }

  save() {
  	let body = {
  		"name": this.form.get('name').value,
  		"mobile": this.form.get('mobile').value,
  		"phone_area_code": this.code || '',
  		"telephone": this.form.get('tel').value || '',
  		"distributor_id": this.distributorId,
  		"default_contact": this.isDefaultContact
  	}

  	console.log(body);

  	this.vjApi.updateDistributorContact(JSON.stringify(body)).subscribe((data) => {
  		console.log(data);
  		this.router.navigate(['../../'], {relativeTo: this.actRoute});
  	})
  		
  }
}
