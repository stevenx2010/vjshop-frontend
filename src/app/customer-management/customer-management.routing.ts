import { Routes } from '@angular/router';

import { CustomerQueryComponent } from './customer-query/customer-query.component';

export const CustomerManagementRoutes: Routes = [
	{ path: 'customer-manage/query', component: CustomerQueryComponent },
];