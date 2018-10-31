import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DistributorComponent } from './distributor/distributor.component';
import { distributorRoutes } from './distributor.routing';
import { DistributorFormComponent } from './distributor-form/distributor-form.component';
import { DistributorAddressFormComponent } from './distributor-address-form/distributor-address-form.component';
import { DistributorContactComponent } from './distributor-contact/distributor-contact.component';
import { DistributorContactFormComponent } from './distributor-contact-form/distributor-contact-form.component';
import { DistributorInventoryFormComponent } from './distributor-inventory-form/distributor-inventory-form.component';
import { DistributorInchargeRegionFormComponent } from './distributor-incharge-region-form/distributor-incharge-region-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(distributorRoutes),
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
  	DistributorComponent, 
  	DistributorFormComponent, 
  	DistributorAddressFormComponent, 
  	DistributorContactComponent, 
  	DistributorContactFormComponent, 
  	DistributorInventoryFormComponent, DistributorInchargeRegionFormComponent
  ]
})
export class DistributorModule { }
