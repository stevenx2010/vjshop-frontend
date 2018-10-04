import { Routes } from '@angular/router';

import { UserOrderComponent } from './user-order/user-order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { DistributorOrderComponent } from './distributor-order/distributor-order.component';

export const orderRoutes: Routes = [
	{ path: 'order/user/query', component: UserOrderComponent },
	{ path: 'order/distributor/query', component: DistributorOrderComponent }
]; 