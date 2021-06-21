import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './_guards/auth.guards';
import { FullLayoutComponent } from './containers/full-layout/full-layout.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { PerfilConsultaComponent } from './views/perfil/perfil-consulta/perfil-consulta.component';
import { AyudaComponent } from './views/ayuda/ayuda.component';
import { CompanyComponent } from './views/company/company.component';

export const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    data: {  title: 'FacturAr' },
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
        data: { title: 'Perfil del Usuario' },
        canActivate: [AuthGuard]
      },
      {
        path: 'ayuda',
        component: AyudaComponent,
        data: { title: 'Guía Rápida' },
        canActivate: [AuthGuard]
      },
      {
        path: 'negocio',
        component: CompanyComponent,
        data: { title: 'Mi Negocio' },
        canActivate: [AuthGuard]
      },
      {
        path: 'item',
        data: { title: 'Producto o Servicio' },
        loadChildren: () => import('./views/item/item.module').then(m => m.ItemModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'counterfoil',
        data: { title: 'Talonario' },
        loadChildren: () => import('./views/counterfoil/counterfoil.module').then(m => m.CounterfoilModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'customer',
        data: { title: 'Cliente' },
        loadChildren: () => import('./views/customer/customer.module').then(m => m.CustomerModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'salespoint',
        data: { title: 'Punto de venta' },
        loadChildren: () => import('./views/salespoint/salespoint.module').then(m => m.SalespointModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'voucher',
        data: { title: 'Punto de venta' },
        loadChildren: () => import('./views/voucher/voucher.module').then(m => m.VoucherModule),
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

