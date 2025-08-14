import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login-page/components/login.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard.component';
import { AuthGuard } from './core/guard/auth.guard';
import { DashboardResolver } from './modules/dashboard/resolvers/dashboard.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Ana sayfayı login'e yönlendir
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], resolve: { data: DashboardResolver } }, // Dashboard'u koruma altına alın
];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }