import { Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { NewComerPageComponent } from './new-comer-page/new-comer-page.component';
import { AboutPageComponent } from './about-page/about-page.component';

import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../../models/user-role.model';

export const pageRoutes: Routes = [
	{ path: 'page/homepage', component: HomePageComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.PAGE_MANAGER}},
	{ path: 'page/newcomerpage', component: NewComerPageComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.PAGE_MANAGER}},
	{ path: 'page/about', component: AboutPageComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.PAGE_MANAGER}},
];