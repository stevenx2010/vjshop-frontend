import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

import { InvoiceProcessComponent } from './invoice-process/invoice-process.component';
import { InvoiceQueryComponent } from './invoice-query/invoice-query.component';
import { invoiceRoutes} from './invoice.routing';

import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(invoiceRoutes),
    FormsModule,
    AngularDateTimePickerModule,
    ComponentsModule
  ],
  declarations: [InvoiceProcessComponent, InvoiceQueryComponent, ]
})
export class InvoiceModule { }
