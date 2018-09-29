import { Routes } from '@angular/router';

import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductCategoryFormComponent } from './product-category-form/product-category-form.component';

import { ProductSubCategoryComponent } from './product-sub-category/product-sub-category.component';
import { ProductSubCategoryFormComponent } from './product-sub-category-form/product-sub-category-form.component';

import { ProductComponent } from './product/product.component';
import { ProductFormComponent } from './product-form/product-form.component';

export const productRoutes: Routes = [
	{path: 'product/category', component: ProductCategoryComponent}, 
	{path: 'product/category/add', component: ProductCategoryFormComponent},
	{path: 'product/category/edit/:id', component: ProductCategoryFormComponent},

	{path: 'product/subcategory', component: ProductSubCategoryComponent},
	{path: 'product/subcategory/add/:id', component: ProductSubCategoryFormComponent},
	{path: 'product/subcategory/edit/:id', component: ProductSubCategoryFormComponent},

	{path: 'product/product', component: ProductComponent},
	{path: 'product/product/add', component: ProductFormComponent},
	{path: 'product/product/edit/:id', component: ProductFormComponent}

]