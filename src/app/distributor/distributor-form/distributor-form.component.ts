import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { VJAPI } from '../../../services/vj.services';
import { Distributor } from '../../../models/distributor.model';

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
  distributor: Distributor;
  addressAdded: number = 1;

  caption: string = '新增经销商';
  formFunction: string = 'add';

  addressIndexToBeDeleted: number;
  contactIndexTobeDeleted: number;

  constructor(private fb: FormBuilder, private vjApi: VJAPI, private router: Router, private actRoute: ActivatedRoute) {
    this.distributor = new Distributor();

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      let obj:NavigationEnd = event;

      let re1 = /\/distributor\/add/;
      let re2 = /\/distributor\/edit/;
      if((obj.url.search(re1) || obj.url.search(re2)) && this.distributorId > 0) {
        this.getDistributorInfo();
      }
    });
  }

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    let urls = this.actRoute.snapshot.url;
    for(let url of urls) {
      if(url.path == 'edit') {
        this.caption = '编辑经销商';
        this.formFunction = 'edit';
        this.distributorId = this.actRoute.snapshot.params['id'];
        this.getDistributorInfo();

        break;
      }
    }
  }

  getDistributorInfo() {
    this.vjApi.queryDistributorInfoById(this.distributorId).subscribe((resp) => {
      if(resp.json()) {
        this.distributor = new Distributor();
        this.distributor = resp.json();
        if(this.formFunction == 'edit') {
          this.form.get('name').setValue(this.distributor.name);
          this.form.get('description').setValue(this.distributor.description);
        }
      }
    });   
  }

  submitData() {
 	let body = {
    "id": this.distributor.id,
		"name": this.form.get('name').value,
 		"description": this.form.get('description').value
	}

  	this.vjApi.updateDistributorInfo(JSON.stringify(body)).subscribe((data) => {
  		this.distributorId = (data.json()).id;
  		if(data.json()) {
  			this.addAddressDisabled = false;
        this.addContactDisabled = false;
        this.distributor = data.json();
  		}
      this.getDistributorInfo();
  	})
  }

  addAddress() {
  	this.router.navigate(['address', this.distributorId], {relativeTo: this.actRoute});
  }

  addContact() {
    this.router.navigate(['contact', this.distributorId], {relativeTo: this.actRoute});
  }

  editAddress(index: number) {
    let addressId = this.distributor.addresses[index].id;
    this.router.navigate(['distributor/edit/address/' + this.distributorId + '/' + addressId]);
  }

  deleteAddress(index: number) {
    this.addressIndexToBeDeleted = index;
  }

  deleteConfirmedAddress() {
    this.vjApi.deleteDistributorAddressById(this.distributor.addresses[this.addressIndexToBeDeleted].id).subscribe((resp) => {
      console.log(resp);
    })
    this.getDistributorInfo();
  }

  editContact(index: number) {
    let contactId = this.distributor.contacts[index].id;
    this.router.navigate(['distributor/edit/contact/' + this.distributorId + '/' + contactId]);
  }

  deleteContact(index: number) {
    this.contactIndexTobeDeleted = index;
  }

  deleteConfirmedContact() {
    this.vjApi.deleteDistributorContactByeId(this.distributor.contacts[this.contactIndexTobeDeleted].id).subscribe((resp) => {
      console.log(resp);
    });
    this.getDistributorInfo();
  }
}
