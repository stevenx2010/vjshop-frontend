import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { VJAPI } from '../../../services/vj.services';
import { CouponType } from '../../../models/coupon-type.model';
import { Coupon } from '../../../models/coupon.model';
import { API_BASE_URL } from '../../../models/constants';

@Component({
  selector: 'app-coupon-form',
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.css']
})
export class CouponFormComponent implements OnInit {
  @ViewChild('imageLocation') imageLocation: ElementRef;
  @ViewChild('newcomer') newcomer: ElementRef;

  caption: string = '新增优惠券';
  formFunction: string = 'add';

  coupon: Coupon;
  couponTypes: CouponType[];
  couponTypeId: number;

  couponId: number;
  baseUrl: string;

  form: FormGroup;
  for_new_comer: boolean = false;

  // for date picker
  date: Date = new Date();
  settings = {
        bigBanner: false,
        timePicker: true,
        format: 'dd-MM-yyyy',
        defaultOpen: false,
    }

  dp: any;

  // for upload image
  imageFile: File;
  element: any;
  fileUploaded: boolean = false;

  constructor(private vjApi: VJAPI, private router: Router, private actRoute: ActivatedRoute, private fb: FormBuilder,
              private renderer: Renderer2) 
  { 
  	this.coupon = new Coupon();
  	this.couponTypes = new Array<CouponType>(new CouponType());
    this.dp = new DatePipe('en-US');
    this.baseUrl = API_BASE_URL;

    this.couponId = this.actRoute.snapshot.params['id'];
    if(this.couponId) {
      this.formFunction = 'edit';
      this.caption = '编辑优惠券';
    }

    console.log(this.couponId);
  }

  ngOnInit() {
  	this.form = this.fb.group({
  		name: ['', Validators.required],
  		description: ['', Validators.required],
  		coupon_type_id: [],
  		expire_date: [],
  		discount_method: [2, Validators.required],
  		discount_percentage: [100, Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.max(100), Validators.min(0)])],
  		discount_value: [0, Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])],
  		quantity_initial: [-1, Validators.compose([Validators.required, Validators.pattern('^-?[0-9]+$')])],
  	});

  	this.vjApi.getCouponTypeAll().subscribe((cts) => {
  		if(cts.length > 0) {
  			this.couponTypes = cts;
  		}
  	})

    // populate the form with current coupon data
    this.vjApi.queryCouponById(this.couponId).subscribe((c) => {
      if(c.length) {
        this.coupon = c[0];
        if(this.formFunction == 'edit') {
          this.form.controls.name.setValue(this.coupon.name);
          this.form.controls.description.setValue(this.coupon.description);
          this.form.controls.coupon_type_id.setValue(this.coupon.coupon_type_id);
          this.form.controls.expire_date.setValue(this.coupon.expire_date);
          this.form.controls.discount_method.setValue(this.coupon.discount_method);
          this.form.controls.discount_percentage.setValue(this.coupon.discount_percentage);
          this.form.controls.discount_value.setValue(this.coupon.discount_value);
          this.form.controls.quantity_initial.setValue(this.coupon.quantity_initial);
          this.for_new_comer = this.coupon.for_new_comer;
          if(this.coupon.for_new_comer) {
            this.newcomer.nativeElement.checked;
          } else {
            this.newcomer.nativeElement.unchecked;
          }

          let imgElement = this.renderer.createElement('img');
          this.renderer.setAttribute(imgElement, 'src', this.baseUrl + this.coupon.image_url);
          this.renderer.setAttribute(imgElement, 'width', '200');
          this.renderer.appendChild(this.imageLocation.nativeElement, imgElement);
          this.element = imgElement;
        }
      }
    })
        
  }

  previewImage(event) {
    if(event.target.files) {
      this.fileUploaded = true;
      if(this.element) {
        this.renderer.removeChild(this.imageLocation.nativeElement, this.element);  // remove previously loaded image
      }
      this.imageFile = event.target.files[0];
      console.log(this.imageFile);

      let imgElement = this.renderer.createElement('img');
      this.renderer.setAttribute(imgElement, 'src', URL.createObjectURL(this.imageFile));
      this.renderer.setAttribute(imgElement, 'width', '200');
      this.renderer.appendChild(this.imageLocation.nativeElement, imgElement);
      this.element = imgElement;
    }
  }

  submit() {
    let body = this.prepareFormData();

    this.vjApi.updateOrCreateCoupon(body).subscribe((c) => {
      console.log(c);
      let coupon = c.json();
      if(coupon) {
        this.couponId = coupon.id;
      }
    })
  }

  prepareFormData() {
    let body = new FormData();

    if(this.couponId) body.append('id', this.couponId+ '');
    body.append('name', this.form.controls.name.value);
    body.append('description', this.form.controls.description.value);
    body.append('coupon_type_id', this.form.controls.coupon_type_id.value);
    body.append('expire_date', this.dp.transform(this.date, 'yyyy-MM-dd 23:59:59'));
    body.append('discount_method', this.form.controls.discount_method.value);
    body.append('discount_percentage', this.form.controls.discount_percentage.value);
    body.append('discount_value', this.form.controls.discount_value.value);
    body.append('quantity_initial', this.form.controls.quantity_initial.value);
    body.append('for_new_comer', (this.for_new_comer ? 1 : 0) + '');

    if(this.imageFile) {
      body.append('image_file', this.imageFile);
    } else {
      body.append('image_url', this.coupon.image_url);
    }
    console.log(body);
    return body;
  }

  checkboxSelected(event) {
    this.for_new_comer = !this.for_new_comer;
    console.log(this.for_new_comer ? 1:0);
  }
}
