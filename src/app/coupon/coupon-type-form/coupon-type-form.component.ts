import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { VJAPI } from '../../../services/vj.services';
import { CouponType } from '../../../models/coupon-type.model';

@Component({
  selector: 'app-coupon-type-form',
  templateUrl: './coupon-type-form.component.html',
  styleUrls: ['./coupon-type-form.component.css']
})
export class CouponTypeFormComponent implements OnInit {

  formFunction: string = 'add';
  caption: string = '新增优惠券类型';
  form: FormGroup;

  couponType: CouponType;
  couponTypeId: number;

  constructor(private vjApi: VJAPI, private fb: FormBuilder, private router: Router, private actRoute: ActivatedRoute) { 
  	this.couponType = new CouponType();
  }

  ngOnInit() {
  	this.form = this.fb.group({
  		type: ['', Validators.required],
  		description: [''],
  		sort_order: [999, Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])]
  	});

  	this.couponTypeId = this.actRoute.snapshot.params['id'];
  	console.log(this.couponTypeId);

  	if(this.couponTypeId) {
  		this.formFunction = 'edit';
  		this.caption = '编辑优惠券类型';

  		// get coupon type from remote server by id
  		this.vjApi.queryCouponTypeById(this.couponTypeId).subscribe((ct) =>{
  			console.log(ct);
  			if(ct) {
  				// fill the form
  				this.form.controls['type'].setValue(ct.type);
  				this.form.controls['description'].setValue(ct.description);
  				this.form.controls['sort_order'].setValue(ct.sort_order);
  			}
  		}) 		
  	}
  }

  submit() {
  	if(this.couponTypeId) {
  		this.couponType.id = this.couponTypeId;
  	} 
		
	this.couponType.type = this.form.controls.type.value;
	this.couponType.description = this.form.controls.description.value;
	this.couponType.sort_order = this.form.controls.sort_order.value;

	this.vjApi.updateOrCreateCouponType(JSON.stringify(this.couponType)).subscribe((resp) => {
		if(resp.json()) {
			let ct: CouponType = resp.json();			
			this.couponTypeId = ct.id;
			if(this.formFunction == 'edit')
				this.router.navigate(['../../'], {relativeTo: this.actRoute});
			else
				this.router.navigate(['../'], {relativeTo: this.actRoute});
		}
	});
  }

  cancel() {
 	if(this.formFunction == 'edit')
		this.router.navigate(['../../'], {relativeTo: this.actRoute});
	else
		this.router.navigate(['../'], {relativeTo: this.actRoute}); 	
  }
}
