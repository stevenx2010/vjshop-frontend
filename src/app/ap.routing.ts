import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home.component';

export const appRoutes: Routes = [
		{ path: 'home', component: HomeComponent },
		{ path: 'login', component: LoginComponent },
		{ path: '**', component: LoginComponent }
	];