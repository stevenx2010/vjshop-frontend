import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ChineseCities } from '../../../models/chinese-cities';
import { VJAPI } from '../../../services/vj.services';
import { DistributorAddress } from '../../../models/distributor-address-model';

@Component({
  selector: 'app-distributor-address-form',
  templateUrl: './distributor-address-form.component.html',
  styleUrls: ['./distributor-address-form.component.css']
})
export class DistributorAddressFormComponent implements OnInit {
  @ViewChild('p') p: ElementRef;
  @ViewChild('c') c: ElementRef;
  @ViewChild('d') d: ElementRef;
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
  addressId: number;

  isDefaultAddress: boolean = true;
  address: DistributorAddress;
  formFunction: string = 'add';
  caption: string = '增加地址';
  upperLink: string;

  constructor(private fb: FormBuilder, private actRoute: ActivatedRoute, private vjApi: VJAPI, private router: Router, 
              private activeRoute: ActivatedRoute) 
  { 
  	this.filteredCities = new Array<any>();
  	this.filteredDistricts = new Array<any>();
    this.address = new DistributorAddress();
  }

  ngOnInit() {

    this.form = this.fb.group({
      province: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      street: ['', Validators.required],
    });

    this.provinces = ChineseCities.cities[0].options;
    this.cities = ChineseCities.cities[1].options;
    this.districts = ChineseCities.cities[2].options;

   	this.sub = this.actRoute.params.subscribe((params) => {
  		this.distributorId = +params['id'];
      this.addressId = +params['addressId'];

      this.upperLink = '/distributor/edit/' + this.distributorId;

      if(this.addressId) {
        this.formFunction = 'edit'; 
        this.caption = '编辑地址';
      }
  	})
  }

  ngAfterViewInit() {
    if(this.formFunction == 'edit') {
        this.vjApi.queryDistributorAddressById(this.addressId).subscribe((a) => {
          if(a.json().length > 0) {
            this.address = a.json();

            let city = this.address[0].city.split(' ');

            let provinceIndex = this.findIndex(this.provinces, city[0]);
            this.p.nativeElement.selectedIndex = provinceIndex;
            this.form.controls['province'].setValue(this.provinces[provinceIndex].value);

            this.doFilterCities(this.provinces[provinceIndex].value)
            let cityIndex = this.findIndex(this.filteredCities, city[1]);
            this.c.nativeElement.selectedIndex = cityIndex;
            this.form.controls['city'].setValue(this.filteredCities[cityIndex].value);

            this.doFilterDistricts(this.filteredCities[cityIndex].value);
            let districtIndex = this.findIndex(this.filteredDistricts, city[2]);
            this.d.nativeElement.selectedIndex = districtIndex;
            this.form.controls['district'].setValue(this.filteredDistricts[districtIndex].value);

            this.form.controls['street'].setValue(this.address[0].street);

            this.isDefaultAddress = this.address[0].default_address;

            this.provinceSelected = city[0];
            this.citySelected = city[1];
            this.districtSelected = city[2];
          }
        })   
      }
  }

  findIndex(array: any[], text: string): number {
    let k = 0;
    while(k < array.length) {
      if(array[k].text == text) break;
      k++;
    }

    return k;
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

  doFilterCities(provinceValue: string): void {
    this.filteredCities = [];
    this.cities.forEach((c) => {
      if(c.parentVal == provinceValue) {
        this.filteredCities.push({"text": c.text, "value": c.value});
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

  doFilterDistricts(cityValue: string): void {
    this.filteredDistricts = [];
    this.districts.forEach((d) => {
      if(d.parentVal == cityValue) {
        this.filteredDistricts.push({"text": d.text, "value": d.value});
      }
    });
  }

  districtChange(event) {
  	this.districtSelected = event.target.options[event.target.selectedIndex].text;
  }

  save() {
  	let body = {
      'id': this.addressId,
  		'city': this.provinceSelected + ' ' + this.citySelected + ' ' + this.districtSelected,
  		'street':  this.form.get('street').value, 
  		'default_address': this.isDefaultAddress,
  		'distributor_id': this.distributorId
  	}

  	this.vjApi.updateDistributorAddress(JSON.stringify(body)).subscribe((data) => {

      if(this.formFunction == 'edit') {
        this.router.navigate(['distributor/edit/' + this.distributorId]);
      } else
  		  this.router.navigate(['../../'], {relativeTo: this.actRoute});
  	});


  }

  onChkBoxChange(event) {
  	this.isDefaultAddress  = event.target.checked;
  }
}
