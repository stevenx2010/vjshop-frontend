import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

import { CustomerManagementRoutes } from './customer-management.routing';
import { CustomerQueryComponent } from './customer-query/customer-query.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CustomerManagementRoutes),
    FormsModule,
    ReactiveFormsModule,
    AngularDateTimePickerModule,
  ],
  declarations: [CustomerQueryComponent],

})
export class CustomerManagementModule { }
