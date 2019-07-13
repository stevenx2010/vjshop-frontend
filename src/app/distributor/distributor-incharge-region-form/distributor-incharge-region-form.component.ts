import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ChineseCities } from '../../../models/chinese-cities';
import { VJAPI } from '../../../services/vj.services';

@Component({
  selector: 'app-distributor-incharge-region-form',
  templateUrl: './distributor-incharge-region-form.component.html',
  styleUrls: ['./distributor-incharge-region-form.component.css']
})
export class DistributorInchargeRegionFormComponent implements OnInit {
  private sub: any;

  formFunction: string = 'add';
  caption: string= '增加管辖区域';

  provinces: any;
  cities: any;

  provinceSelected: string;
  filteredCities: any[];
  selectedCities: any[];
  inchargeCities: any[];
  selectedOptions: any[];
  selectedInchargeOptions: any[];
  selectedInchargeCities: any[];

  distributorId: number;
  inchargeRegionId: number;
  selectedProvinceIndex: number;

  regionId: number;
  upperLink: string;

  conflict: boolean = false;
  conflictedNames: any;
  conflictedRegions: any;

  constructor(private vjApi: VJAPI, private router: Router, private actRoute: ActivatedRoute) { 
  	this.filteredCities = new Array<any>();
  	this.selectedCities = new Array<any>();
  	this.inchargeCities = new Array<any>();
  	this.selectedOptions = new Array<any>();
  	this.selectedInchargeOptions = new Array<any>();
  	this.selectedInchargeCities = new Array<any>();
  }

  ngOnInit() {
    this.provinces = ChineseCities.cities[0].options;
    this.cities = ChineseCities.cities[1].options;

   	this.sub = this.actRoute.params.subscribe((params) => {
  		this.distributorId = +params['id'];
      this.regionId = +params['regionId'];

      this.upperLink = '/distributor/edit/' + this.distributorId;

      if(this.regionId) {
        this.formFunction = 'edit'; 
        this.caption = '编辑管辖区域';
      }
  	})
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

  citySelected(event): void {
  	this.selectedOptions = event.target.selectedOptions;
  	this.conflict = false;
  }

  checkIfDuplicated(items, item) {
  	for(let i = 0; i < items.length; i++) {
  		if(item.text == items[i].text) return true;
  	}
  	return false;
  }

  inchargeCitySelected(event): void {
  	let options = event.target.selectedOptions;
  	for(let i = 0; i < options.length; i++) {
  		let value = (options[i].value).split("'");
  		if(!this.checkIfDuplicated(this.selectedInchargeCities, options[i])){
  			this.selectedInchargeCities.push({"text": options[i].text, "value": value[1]});
  		}
  	}
  }

  select() {
  	let options = this.selectedOptions;
  	for(let i = 0; i < options.length; i++) {
  		let value = (options[i].value).split("'");
  		if(!this.checkIfDuplicated(this.inchargeCities, options[i])) {
  			this.inchargeCities.push({"text": this.provinceSelected + ' ' + options[i].text, "value": value[1]});
  		}
  	} 	
  }

  delete() {
  	let temp: any = [];
  	let selectedCityNames = this.selectedInchargeCities.map((o) => {return o.text});
  	for(let i = 0; i < this.inchargeCities.length; i++) {
  		if(selectedCityNames.indexOf(this.inchargeCities[i].text) < 0) {
  			temp.push(this.inchargeCities[i]);
  		} 
  	}
  	this.inchargeCities = temp;
  	this.selectedInchargeCities = [];
  }

  save() {
    console.log(this.inchargeCities);
    
  	let cities = this.inchargeCities.map((c) => {
  		//return this.provinceSelected + ' ' + c.text;
      return c.text;
  	});

  	console.log(cities);
  	let body = {
  		'distributor_id': this.distributorId,
  		'regions': cities
  	}
  	this.vjApi.updateDistributorInchargeRegions(body).subscribe((resp)=> {
  		console.log(resp);
  		this.router.navigate(['../../'], {relativeTo: this.actRoute});
  	},
	(err) => {
		this.conflict = true;
		console.log(err.json());
		if(err.json()) {
			this.conflictedNames = err.json().names;
			this.conflictedRegions = err.json().regions;
		}
	});
  }
}
