import { Routes } from '@angular/router';

import { InvoiceQueryComponent } from './invoice-query/invoice-query.component';
import { InvoiceProcessComponent } from './invoice-process/invoice-process.component';

import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../../models/user-role.model';

export const invoiceRoutes: Routes = [
	{ path: 'invoice/process', component: InvoiceProcessComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.INVOICE_MANAGER}},
	{ path: 'invoice/query', component: InvoiceQueryComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.INVOICE_MANAGER} }
];