import { Component, OnInit } from '@angular/core';

import { VJAPI } from '../../../services/vj.services';
import { Distributor } from '../../../models/distributor.model';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-distributor',
  templateUrl: './distributor.component.html',
  styleUrls: ['./distributor.component.css']
})
export class DistributorComponent implements OnInit {

  distributors: Distributor[];
  checkedRadioBtn: number;
  radioBtnValue: any;
  distributorIdToBeDeleted: any;
  form: any;

  constructor(private vjApi: VJAPI, private fb: FormBuilder, private router: Router) { 
  	this.distributors = new Array<Distributor>();
  }

  ngOnInit() {
  	this.form = this.fb.group({
  		searchText: ['']
  	});

// 	this.getDistributors();
  }

  getDistributors() {
  	this.vjApi.getDistributors().subscribe((d) => {
  		if(d.json().length > 0) {
  			this.distributors = d.json();
  		}
  	}) 	
  }

  radioChecked(e, i) {
  	this.checkedRadioBtn = i;
  }

  edit(index: number) {
    this.router.navigate(['distributor/edit/' + this.distributors[index].id]);
  }

  delete(index: number) {
  	this.checkedRadioBtn = index;
  	this.radioBtnValue = index;
  	this.distributorIdToBeDeleted = this.distributors[index].id;

  }

  deleteConfirmed() {
  	this.vjApi.deleteDistributor(this.distributorIdToBeDeleted).subscribe((resp) => console.log(resp));
  	this.distributors =  new Array<Distributor>();
  	this.getDistributors();
  }

  search() {
  	let searchText = this.form.controls.searchText.value;
    console.log(searchText);
    if(searchText == null || (searchText != null && searchText.length == 0) || (searchText == '*')) {
      this.getDistributors();
    } else {
  	  this.vjApi.queryDistributorInfo(searchText).subscribe((r) => {
  		  if(r.json().length > 0) {
  			  this.distributors = r.json();
  		  }
  	  });
    }
  }

}
