import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { authRoutes } from './auth.routing';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],

  exports: [
  	LoginComponent
  ],
  declarations: [LoginComponent, UserManagementComponent, ResetPasswordComponent, CreateNewUserComponent]
})
export class AuthModule { }
