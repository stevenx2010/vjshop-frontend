import { Routes } from '@angular/router';

import { UserOrderComponent } from './user-order/user-order.component';
import { DistributorOrderComponent } from './distributor-order/distributor-order.component';
import { CancelProcessComponent } from './cancel-process/cancel-process.component';
import { CancelQueryComponent } from './cancel-query/cancel-query.component';

export const orderRoutes: Routes = [
	{ path: 'order/user/query', component: UserOrderComponent },
	{ path: 'order/distributor/query', component: DistributorOrderComponent },
	{ path: 'order/cancel/process', component: CancelProcessComponent },
	{ path: 'order/cancel/query', component: CancelQueryComponent }
]; 