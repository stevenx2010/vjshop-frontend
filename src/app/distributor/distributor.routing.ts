import { Routes } from '@angular/router';

import { DistributorComponent } from './distributor/distributor.component';
import { DistributorFormComponent } from './distributor-form/distributor-form.component';
import { DistributorAddressFormComponent } from './distributor-address-form/distributor-address-form.component';
import { DistributorContactFormComponent } from './distributor-contact-form/distributor-contact-form.component';
import { DistributorInventoryFormComponent } from './distributor-inventory-form/distributor-inventory-form.component';
import { DistributorInchargeRegionFormComponent } from './distributor-incharge-region-form/distributor-incharge-region-form.component';

import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../../models/user-role.model';

export const distributorRoutes: Routes = [
	{ path: 'distributor', component: DistributorComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.DISTRIBUTOR_MANAGER}},
	{ path: 'distributor/add/:id', component: DistributorFormComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.DISTRIBUTOR_MANAGER},
	  children: [
	  	{ path: 'address/:id', component: DistributorAddressFormComponent},
	  	{ path: 'contact/:id', component: DistributorContactFormComponent},
	  	{ path: 'region/:id', component: DistributorInchargeRegionFormComponent}
	  ]
	},
	{ path: 'distributor/edit/:id', component: DistributorFormComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.DISTRIBUTOR_MANAGER},
	  children: [
	  	{ path: 'address/:id', component: DistributorAddressFormComponent},
	  	{ path: 'contact/:id', component: DistributorContactFormComponent},
	  	{ path: 'region/:id', component: DistributorInchargeRegionFormComponent}
	  ] 
	}, 
	{ path: 'distributor/edit/address/:id/:addressId', component: DistributorAddressFormComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.DISTRIBUTOR_MANAGER}},
	{ path: 'distributor/edit/contact/:id/:contactId', component: DistributorContactFormComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.DISTRIBUTOR_MANAGER}},
	{ path: 'distributor/inventory', component: DistributorInventoryFormComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.DISTRIBUTOR_MANAGER} },

];