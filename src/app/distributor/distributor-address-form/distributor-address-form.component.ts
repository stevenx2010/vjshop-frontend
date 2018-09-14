import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ChineseCities } from '../../../models/chinese-cities';
import { VJAPI } from '../../../services/vj.services';

@Component({
  selector: 'app-distributor-address-form',
  templateUrl: './distributor-address-form.component.html',
  styleUrls: ['./distributor-address-form.component.css']
})
export class DistributorAddressFormComponent implements OnInit {

  form: FormGroup;
  private sub: any

  provinces: any;
  cities: any;
  districts: any;

  filteredCities: any[];
  filteredDistricts: any[];

  provinceSelected: string;
  citySelected: string;
  districtSelected: string;

  distributorId:number;

  isDefaultAddress: boolean = true;

  constructor(private fb: FormBuilder, private actRoute: ActivatedRoute, private vjApi: VJAPI, private router: Router) { 
  	this.filteredCities = new Array<any>();
  	this.filteredDistricts = new Array<any>();
  }

  ngOnInit() {

   	this.sub = this.actRoute.params.subscribe((params) => {
  		this.distributorId = +params['id'];
  	})

  	console.log(this.distributorId);

  	this.form = this.fb.group({
  		province: ['', Validators.required],
  		city: ['', Validators.required],
  		district: ['', Validators.required],
  		street: ['', Validators.required],
  	});

  	this.provinces = ChineseCities.cities[0].options;
  	this.cities = ChineseCities.cities[1].options;
  	this.districts = ChineseCities.cities[2].options;

  }

  ngOnDestroy() {
  	this.sub.unsubscribe();
  }

  filterCities(event): void {
  	this.filteredCities = [];
  	let value = event.target.value;
  	this.provinceSelected = event.target.options[event.target.selectedIndex].text;

  	this.cities.forEach( (data) => {
  		if(data.parentVal == value) {
  			this.filteredCities.push({"text": data.text, "value": data.value});
  		}
  	})
  }

  filterDistricts(event): void {
  	this.filteredDistricts = [];
  	let value = event.target.value;
  	this.citySelected = event.target.options[event.target.selectedIndex].text;

  	this.districts.forEach((data) => {
  		if(data.parentVal == value) {
  			this.filteredDistricts.push({"text": data.text, "value": data.value});
  		}
  	})
  }

  districtChange(event) {
  	this.districtSelected = event.target.options[event.target.selectedIndex].text;
  }

  save() {
  	let body = {
  		'city': this.provinceSelected + ' ' + this.citySelected + ' ' + this.districtSelected,
  		'street':  this.form.get('street').value, 
  		'default_address': this.isDefaultAddress,
  		'distributor_id': this.distributorId
  	}

  	this.vjApi.updateDistributorAddress(JSON.stringify(body)).subscribe((data) => {
  		console.log(data);

  		this.router.navigate(['../../'], {relativeTo: this.actRoute});
  	});


  }

  onChkBoxChange(event) {
  	this.isDefaultAddress  = event.target.checked;
  }
}
