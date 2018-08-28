import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { VJAPI } from '../services/vj.services';

import { AppComponent } from './app.component';

import { appRoutes } from './ap.routing';

import { ProductModule } from './product/product.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ProductModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
  ],
  providers: [
  	VJAPI
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
