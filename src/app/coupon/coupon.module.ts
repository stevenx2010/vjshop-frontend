import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { couponRoutes } from './coupon.routing';
import { CouponTypeComponent } from './coupon-type/coupon-type.component';
import { CouponTypeFormComponent } from './coupon-type-form/coupon-type-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(couponRoutes),
  ],
  declarations: [CouponTypeComponent, CouponTypeFormComponent]
})
export class CouponModule { }
