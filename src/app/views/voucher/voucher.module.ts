import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoucherComponent } from './voucher.component';
import { VoucherConsultaComponent } from './voucher-consulta/voucher-consulta.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppAppliedFiltersModule } from 'app/components/app-applied-filters/app-applied-filters.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'app/app.module';
import { HttpClient } from '@angular/common/http';
import { VoucherService } from 'app/_services/voucher.service';
import { SalesPointService } from 'app/_services/sales.point.service';
import { CounterfoilService } from 'app/_services/counterfoil.service';

const routes: Routes = [
  { path: '', component: VoucherConsultaComponent, data: { title: 'Consulta' } },
  { path: 'nuevo', component: VoucherComponent, data: { title: 'Alta o Modificación de Comprobante' } },
 
  // { path: 'editar', component: GuiasEditarComponent, data: { title: 'Editar Guia' } },
  // { path: 'detalle/:id', component: GuiasDetalleComponent, data: { title: 'Guía N°' } }
];

@NgModule({
  declarations: [VoucherComponent, VoucherConsultaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppAppliedFiltersModule,
    Ng2SmartTableModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    TranslateModule.forRoot({
        loader: {
           provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
            }
        }),
        RouterModule.forChild(routes)
  ],
  entryComponents: [

],
  providers: [
    VoucherService,
    SalesPointService,
    CounterfoilService
]
})
export class VoucherModule { }
