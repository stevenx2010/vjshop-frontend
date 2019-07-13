import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserOrderComponent } from './user-order/user-order.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { orderRoutes} from './order.routing';

import { DistributorOrderComponent } from './distributor-order/distributor-order.component';

import { ComponentsModule } from '../components/components.module';
import { CancelProcessComponent } from './cancel-process/cancel-process.component';
import { CancelQueryComponent } from './cancel-query/cancel-query.component';
import { OrderPriceComponent } from './order-price/order-price.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(orderRoutes),
    FormsModule,
    AngularDateTimePickerModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [UserOrderComponent, DistributorOrderComponent, CancelProcessComponent, CancelQueryComponent, OrderPriceComponent],
  providers: [
  	{ provide: 'MODULE_NAME', useValue: '订单管理模块'}
  ]
})
export class OrderModule { }
