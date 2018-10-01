import { Routes } from '@angular/router';

import { UserOrderComponent } from './user-order/user-order.component';

export const orderRoutes: Routes = [
	{ path: 'order/user/query', component: UserOrderComponent },

]; 