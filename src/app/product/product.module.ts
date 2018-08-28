import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { productRoutes } from './product.routing';
import { ProductCategoryFormComponent } from './product-category-form/product-category-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes),
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ProductCategoryComponent, ProductCategoryFormComponent]
})
export class ProductModule { }
