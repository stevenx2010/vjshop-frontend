import { Routes } from '@angular/router';

import { CouponTypeComponent } from './coupon-type/coupon-type.component';
import { CouponTypeFormComponent } from './coupon-type-form/coupon-type-form.component';

export const couponRoutes: Routes = [
	{ path: 'coupon/type', component: CouponTypeComponent,
		children: [
			{ path: 'add', component: CouponTypeFormComponent},
			{ path: 'edit/:id', component: CouponTypeFormComponent}
		]
	},
]