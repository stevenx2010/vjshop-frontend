import { Routes } from '@angular/router';

import { DistributorComponent } from './distributor/distributor.component';
import { DistributorFormComponent } from './distributor-form/distributor-form.component';
import { DistributorAddressFormComponent } from './distributor-address-form/distributor-address-form.component';
import { DistributorContactFormComponent } from './distributor-contact-form/distributor-contact-form.component';
import { DistributorInventoryFormComponent } from './distributor-inventory-form/distributor-inventory-form.component';

export const distributorRoutes: Routes = [
	{ path: 'distributor', component: DistributorComponent },
	{ path: 'distributor/add/:id', component: DistributorFormComponent,
	  children: [
	  	{ path: 'address/:id', component: DistributorAddressFormComponent},
	  	{ path: 'contact/:id', component: DistributorContactFormComponent}] },
	{ path: 'distributor/edit/:id', component: DistributorFormComponent,
	  children: [
	  	{ path: 'address/:id', component: DistributorAddressFormComponent},
	  	{ path: 'contact/:id', component: DistributorContactFormComponent}] }, 
	{ path: 'distributor/edit/address/:id/:addressId', component: DistributorAddressFormComponent},
	{ path: 'distributor/edit/contact/:id/:contactId', component: DistributorContactFormComponent},
	{ path: 'distributor/inventory', component: DistributorInventoryFormComponent },

];