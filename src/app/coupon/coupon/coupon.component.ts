import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VJAPI } from '../../../services/vj.services';
import { API_BASE_URL, DiscountMethod } from '../../../models/constants';
import { Coupon } from '../../../models/coupon.model';
import { CouponType } from '../../../models/coupon-type.model';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  baseUrl: string;

  coupons: Coupon[];
  couponTypes: CouponType[];
  cts: CouponType[];
  keyword: string;

  selectedCouponTypeId: number;
  indexToBeDeleted: number;

  constructor(private vjApi: VJAPI, private router: Router, private actRoute: ActivatedRoute) { 
  	this.baseUrl = API_BASE_URL;
  	this.coupons = new Array<Coupon>();
  	this.cts = new Array<CouponType>();
  	this.couponTypes = new Array<CouponType>(new CouponType());
  }

  ngOnInit() {
  	this.vjApi.getCouponTypeAll().subscribe((cts) => {
  		if(cts.length > 0) {
  			this.cts = cts;
  			for(let ct of cts)
  				this.couponTypes.push(ct);
  		}
  	})
  }

  query() {
  	this.coupons = new Array<Coupon>();
  	if(this.selectedCouponTypeId == null) this.selectedCouponTypeId = 0;
  	if(this.keyword == null || (this.keyword && this.keyword.length == 0)) this.keyword = '';
  	let params = {
	  	'coupon_type_id': this.selectedCouponTypeId,
	  	'keyword': this.keyword.trim()
  	}
  	console.log(params);
  	this.vjApi.queryCoupon(JSON.stringify(params)).subscribe((c) => {
  		console.log(c);
  		if(c.length > 0) {
  			this.coupons = c;
  		}
  	})  	
  }

  selected(event) {
  	console.log(event.target.value);
  	this.selectedCouponTypeId = event.target.value;
  }

  edit(index: number) {
    this.router.navigate(['edit/' + this.coupons[index].id], { relativeTo: this.actRoute});
  }

  delete(index:number) {
  	this.indexToBeDeleted = index;
  }

  deleteConfirmed() {

  }

  cancel() {
  	this.indexToBeDeleted = -1;
  }

}
