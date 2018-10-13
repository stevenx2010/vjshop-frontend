import { Routes } from '@angular/router';

import { ShippingFeeComponent } from './shipping-fee/shipping-fee.component';

import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../../models/user-role.model';

export const settingRoutes: Routes = [
	{ path: 'setting/shippingfee', component: ShippingFeeComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.SETTING_MANAGER}}
];