import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VJAPI } from '../../../services/vj.services';
import { CouponType } from '../../../models/coupon-type.model';

@Component({
  selector: 'app-coupon-type',
  templateUrl: './coupon-type.component.html',
  styleUrls: ['./coupon-type.component.css']
})
export class CouponTypeComponent implements OnInit {

  couponTypes: CouponType[];

  selectedItemSet: any;
  swapBtnDisabled: boolean = true;
  updateBtnDisabled: boolean = true;
  isActive: boolean = false;
  swapList: number[];

  constructor(private vjApi: VJAPI, private router: Router, private actRoute: ActivatedRoute) { 
  	this.couponTypes = new Array<CouponType>();
  	this.selectedItemSet = new Set();
  	this.swapList = new Array<number>();
  }

  ngOnInit() {
  	this.vjApi.getCouponTypeAll().subscribe((ct) => {
  		console.log(ct);
  		if(ct.length > 0) {
  			this.couponTypes = ct;
  		}
  	})
  }


  checkboxChecked(event, index) {
    if(event.target.checked) {
      this.selectedItemSet.add(index);
      this.isActive = true;
    } else {
      this.selectedItemSet.delete(index);
      this.isActive = false;
    }

    // checked the size of the Set
    if(this.selectedItemSet.size == 2) {
      this.swapBtnDisabled = false;
    } else {
      this.swapBtnDisabled = true;
    }
  }

  swap() {
    this.swapList = [];

    if(this.selectedItemSet.size == 2) {
      let iter = this.selectedItemSet.values();
      let i = iter.next().value;
      let j = iter.next().value;

      this.swapList.push(this.couponTypes[i].id);
      this.swapList.push(this.couponTypes[j].id);

      let temp = this.couponTypes[i].sort_order;
      this.couponTypes[i].sort_order = this.couponTypes[j].sort_order;
      this.couponTypes[j].sort_order = temp;

      this.updateBtnDisabled = false;
    } else {
      this.updateBtnDisabled = true;
    }
  }

  add() {
  	this.router.navigate(['add'], {relativeTo: this.actRoute});
  }

  edit(index: number) {

  }

  delete(index: number) {

  }

  deleteConfirmed() {

  }
}
