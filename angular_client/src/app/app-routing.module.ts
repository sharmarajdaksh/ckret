import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import AuthGuardService from '../app/services/auth-guard.service';
import { SecretsComponent } from './secrets/secrets.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', component: SecretsComponent, canActivate: [AuthGuardService] },
  {path: 'auth/:sol', component: AuthComponent},
  {path: 'auth', component: AuthComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
