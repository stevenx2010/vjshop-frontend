import { Routes } from '@angular/router';

import { CouponTypeComponent } from './coupon-type/coupon-type.component';
import { CouponTypeFormComponent } from './coupon-type-form/coupon-type-form.component';
import { CouponComponent } from './coupon/coupon.component';
import { CouponFormComponent } from './coupon-form/coupon-form.component';

export const couponRoutes: Routes = [
	{ path: 'coupon/type', component: CouponTypeComponent,
		children: [
			{ path: 'add', component: CouponTypeFormComponent},
			{ path: 'edit/:id', component: CouponTypeFormComponent}
		]
	},
	{ path: 'coupon', component: CouponComponent },
	{ path: 'coupon/add', component: CouponFormComponent},
	{ path: 'coupon/edit/:id', component: CouponFormComponent}
]