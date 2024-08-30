import { Routes } from '@angular/router';
import { signedInGuard, signedOutGuard } from './auth/oauth2.guard';

import { SignInPageComponent } from './pages/signin/signin.page.component';
import { LandingPageComponent } from './pages/landing/landing.page.component';
import { SignUpPageComponent } from './pages/signup/signup.page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  // Routes for authentication
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

  // Routes for viewing content
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [signedInGuard],
  },

  // General
  { path: 'landing', component: LandingPageComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
];
