import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  imports: [
    CommonModule,
  	FormsModule,
  ],
  exports: [
  	OrderDetailComponent,
  	ChatComponent,

  ],
  declarations: [OrderDetailComponent, ChatComponent]
})
export class ComponentsModule { }
