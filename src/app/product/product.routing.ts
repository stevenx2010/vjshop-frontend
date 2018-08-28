import { Routes } from '@angular/router';

import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductCategoryFormComponent } from './product-category-form/product-category-form.component';

export const productRoutes: Routes = [
	{path: 'product/category', component: ProductCategoryComponent},
	{path: 'product/category/add', component: ProductCategoryFormComponent},
]