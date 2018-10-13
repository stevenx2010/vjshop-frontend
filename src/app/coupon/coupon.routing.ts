import { Routes } from '@angular/router';

import { CouponTypeComponent } from './coupon-type/coupon-type.component';
import { CouponTypeFormComponent } from './coupon-type-form/coupon-type-form.component';
import { CouponComponent } from './coupon/coupon.component';
import { CouponFormComponent } from './coupon-form/coupon-form.component';

import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../../models/user-role.model';

export const couponRoutes: Routes = [
	{ path: 'coupon/type', component: CouponTypeComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.COUPON_MANAGER},
		children: [
			{ path: 'add', component: CouponTypeFormComponent},
			{ path: 'edit/:id', component: CouponTypeFormComponent}
		]
	},
	{ path: 'coupon', component: CouponComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.COUPON_MANAGER} },
	{ path: 'coupon/add', component: CouponFormComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.COUPON_MANAGER}},
	{ path: 'coupon/edit/:id', component: CouponFormComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.COUPON_MANAGER}}
]