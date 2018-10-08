import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component';

export const authRoutes: Routes = [
	{ path: 'auth/login', component: LoginComponent },
	{ path: 'auth/manage-user', component: UserManagementComponent },
	{ path: 'auth/reset-password', component: ResetPasswordComponent },
	{ path: 'auth/new-user', component: CreateNewUserComponent },
	{ path: 'auth/edit-user', component: CreateNewUserComponent }
]