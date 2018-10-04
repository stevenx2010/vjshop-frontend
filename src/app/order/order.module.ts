import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserOrderComponent } from './user-order/user-order.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { orderRoutes} from './order.routing';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { DistributorOrderComponent } from './distributor-order/distributor-order.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(orderRoutes),
    FormsModule,
    AngularDateTimePickerModule,

  ],
  declarations: [UserOrderComponent, DistributorOrderComponent, OrderDetailComponent]
})
export class OrderModule { }
