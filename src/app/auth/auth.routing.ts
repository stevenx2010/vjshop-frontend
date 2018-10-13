import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component';
import { UserRolesComponent } from './user-roles/user-roles.component';

import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { Roles } from '../../models/user-role.model';

export const authRoutes: Routes = [
	{ path: 'auth/login', component: LoginComponent },
	{ path: 'auth/manage-user', component: UserManagementComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.ADMINISTRATOR}},
	{ path: 'auth/reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.ADMINISTRATOR} },
	{ path: 'auth/new-user', component: CreateNewUserComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.ADMINISTRATOR} },
	{ path: 'auth/edit-user', component: CreateNewUserComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.ADMINISTRATOR} },
	{ path: 'auth/roles', component: UserRolesComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: Roles.ADMINISTRATOR} }
]