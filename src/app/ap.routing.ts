import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';

export const appRoutes: Routes = [
		{ path: 'home', component: HomeComponent },
		{ path: 'login', component: LoginComponent },
		{ path: 'about', component: AboutComponent },
		{ path: '**', component: LoginComponent }
	];