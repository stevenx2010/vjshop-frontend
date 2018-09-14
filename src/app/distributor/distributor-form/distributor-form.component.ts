import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { VJAPI } from '../../../services/vj.services';

@Component({
  selector: 'app-distributor-form',
  templateUrl: './distributor-form.component.html',
  styleUrls: ['./distributor-form.component.css']
})
export class DistributorFormComponent implements OnInit {

  form: FormGroup;

  distributorId: number;
  addAddressDisabled: boolean = true;
  addContactDisabled: boolean = true;

  constructor(private fb: FormBuilder, private vjApi: VJAPI, private router: Router, private actRoute: ActivatedRoute) {
  }

  ngOnInit() {
  	this.form = this.fb.group({
  		name: ['', Validators.required],
  		description: ['', Validators.required]
  	});
  }

  submitData() {
 	let body = {
		"name": this.form.get('name').value,
 		"description": this.form.get('description').value
	}

  	this.vjApi.updateDistributorInfo(JSON.stringify(body)).subscribe((data) => {
  		console.log(data.json());
  		this.distributorId = (data.json()).id;
  		if(data) {
  			this.addAddressDisabled = false;
        this.addContactDisabled = false;
  		}
  	})
  }

  addAddress() {
  	this.router.navigate(['address', this.distributorId], {relativeTo: this.actRoute});
  }

  addContact() {
    this.router.navigate(['contact', this.distributorId], {relativeTo: this.actRoute});
  }
}
