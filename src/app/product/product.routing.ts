import { Routes } from '@angular/router';

import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductCategoryFormComponent } from './product-category-form/product-category-form.component';

import { ProductSubCategoryComponent } from './product-sub-category/product-sub-category.component';
import { ProductSubCategoryFormComponent } from './product-sub-category-form/product-sub-category-form.component';

import { ProductComponent } from './product/product.component';
import { ProductFormComponent } from './product-form/product-form.component';

import { LoginComponent } from '../auth/login/login.component';

import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../../models/user-role.model';

export const productRoutes: Routes = [
	{path: 'product/category', component: ProductCategoryComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.PRODUCT_MANAGER}}, 
	{path: 'product/category/add', component: ProductCategoryFormComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.PRODUCT_MANAGER}},
	{path: 'product/category/edit/:id', component: ProductCategoryFormComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.PRODUCT_MANAGER}},

	{path: 'product/subcategory', component: ProductSubCategoryComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.PRODUCT_MANAGER}},
	{path: 'product/subcategory/add/:id', component: ProductSubCategoryFormComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.PRODUCT_MANAGER}},
	{path: 'product/subcategory/edit/:id', component: ProductSubCategoryFormComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.PRODUCT_MANAGER}},

	{path: 'product/product', component: ProductComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.PRODUCT_MANAGER}},
	{path: 'product/product/add', component: ProductFormComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.PRODUCT_MANAGER}},
	{path: 'product/product/edit/:id', component: ProductFormComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.PRODUCT_MANAGER}},
	


]