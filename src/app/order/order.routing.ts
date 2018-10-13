import { Routes } from '@angular/router';

import { UserOrderComponent } from './user-order/user-order.component';
import { DistributorOrderComponent } from './distributor-order/distributor-order.component';
import { CancelProcessComponent } from './cancel-process/cancel-process.component';
import { CancelQueryComponent } from './cancel-query/cancel-query.component';

import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../../models/user-role.model';

export const orderRoutes: Routes = [
	{ path: 'order/user/query', component: UserOrderComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.ORDER_MANAGER}},
	{ path: 'order/distributor/query', component: DistributorOrderComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.ORDER_MANAGER}},
	{ path: 'order/cancel/process', component: CancelProcessComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.ORDER_MANAGER}},
	{ path: 'order/cancel/query', component: CancelQueryComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.ORDER_MANAGER}}
]; 