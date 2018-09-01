import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { productRoutes } from './product.routing';
import { ProductCategoryFormComponent } from './product-category-form/product-category-form.component';
import { ProductSubCategoryComponent } from './product-sub-category/product-sub-category.component';
import { ProductSubCategoryFormComponent } from './product-sub-category-form/product-sub-category-form.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes),
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ProductCategoryComponent, ProductCategoryFormComponent, ProductSubCategoryComponent, ProductSubCategoryFormComponent, ProductFormComponent, ProductComponent, ]
})
export class ProductModule { }
