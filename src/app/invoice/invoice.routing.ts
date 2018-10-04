import { Routes } from '@angular/router';

import { InvoiceQueryComponent } from './invoice-query/invoice-query.component';
import { InvoiceProcessComponent } from './invoice-process/invoice-process.component';

export const invoiceRoutes: Routes = [
	{ path: 'invoice/process', component: InvoiceProcessComponent },
	{ path: 'invoice/query', component: InvoiceQueryComponent }
];