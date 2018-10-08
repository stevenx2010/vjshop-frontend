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
import { CustomerServiceModule } from './customer-service/customer-service.module';
import { AuthModule } from './auth/auth.module';

import { CookieService } from 'ngx-cookie-service';

import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent,
    HomeComponent,
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
    CustomerServiceModule,
    AuthModule
  ],
  providers: [
  	VJAPI,
    CookieService,
    AuthGuard
  ],
  exports: [
    NavbarComponent,
    MenuComponent,
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
