import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { couponRoutes } from './coupon.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

import { CouponTypeComponent } from './coupon-type/coupon-type.component';
import { CouponTypeFormComponent } from './coupon-type-form/coupon-type-form.component';
import { CouponComponent } from './coupon/coupon.component';
import { CouponFormComponent } from './coupon-form/coupon-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(couponRoutes),
    ReactiveFormsModule,
    FormsModule,
    AngularDateTimePickerModule,
  ],
  declarations: [CouponTypeComponent, CouponTypeFormComponent, CouponComponent, CouponFormComponent]
})
export class CouponModule { }
