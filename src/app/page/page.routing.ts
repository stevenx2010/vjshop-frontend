import { Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { NewComerPageComponent } from './new-comer-page/new-comer-page.component';

export const pageRoutes: Routes = [
	{ path: 'page/homepage', component: HomePageComponent },
	{ path: 'page/newcomerpage', component: NewComerPageComponent },
];