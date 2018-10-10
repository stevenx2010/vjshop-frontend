import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { settingRoutes } from './setting.routing';
import { ShippingFeeComponent } from './shipping-fee/shipping-fee.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(settingRoutes),
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [ShippingFeeComponent]
})
export class SettingModule { }
