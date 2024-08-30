import { Routes } from '@angular/router';
import { signedInGuard, signedOutGuard } from './auth/oauth2.guard';

import { SignInPageComponent } from './pages/signin/signin.page.component';
import { LandingPageComponent } from './pages/landing/landing.page.component';
import { SignUpPageComponent } from './pages/signup/signup.page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsPageComponent } from './pages/settings/settings.component';

export const routes: Routes = [
	{
		path: 'signup',
		component: SignUpPageComponent,
		canActivate: [signedOutGuard],
	},
	{
		path: 'signin',
		component: SignInPageComponent,
		canActivate: [signedOutGuard],
	},
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [signedInGuard],
	},
	{ path: 'landing', component: LandingPageComponent },
	{
		path: 'settings',
		component: SettingsPageComponent,
		canActivate: [signedInGuard],
	},
	{ path: '', redirectTo: '/landing', pathMatch: 'full' },
];
