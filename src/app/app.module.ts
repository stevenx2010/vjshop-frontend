import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { VJAPI } from '../services/vj.services';

import { AppComponent } from './app.component';

import { appRoutes } from './ap.routing';

import { ProductModule } from './product/product.module';
import { DistributorModule } from './distributor/distributor.module';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { MenuComponent } from './ui/menu/menu.component';
import { CouponModule } from './coupon/coupon.module';
import { OrderModule } from './order/order.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PageModule } from './page/page.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent, 
  ],
  imports: [
    BrowserModule,
    ProductModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    DistributorModule,
    CouponModule,
    OrderModule,
    InvoiceModule,
    PageModule,
  ],
  providers: [
  	VJAPI
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
