import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
  	OrderDetailComponent,
  ],
  declarations: [OrderDetailComponent]
})
export class ComponentsModule { }
