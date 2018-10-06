import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePageComponent } from './home-page/home-page.component';
import { NewComerPageComponent } from './new-comer-page/new-comer-page.component';
import { pageRoutes } from './page.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(pageRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [HomePageComponent, NewComerPageComponent]
})
export class PageModule { }
