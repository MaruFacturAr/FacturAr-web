import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './_guards/auth.guards';
import { FullLayoutComponent } from './containers/full-layout/full-layout.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { PerfilConsultaComponent } from './views/perfil/perfil-consulta/perfil-consulta.component';
import { AyudaComponent } from './views/ayuda/ayuda.component';

export const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    data: {  title: 'SRD Comex' },
    children: [
      {
        path:'',
        redirectTo:'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Resumen' },
        canActivate: [AuthGuard]
      },
      {
        path: 'perfil',
        component: PerfilConsultaComponent,
        data: { title: 'Perfil de Cliente' },
        canActivate: [AuthGuard]
      },
      {
        path: 'ayuda',
        component: AyudaComponent,
        data: { title: 'Guía Rápida' },
        canActivate: [AuthGuard]
      },
      
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

