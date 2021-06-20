import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalespointComponent } from './salespoint.component';
import { SalespointConsultaComponent } from './salespoint-consulta/salespoint-consulta.component';
import { RouterModule, Routes } from '@angular/router';
import { SalesPointService } from 'app/_services/sales.point.service';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'app/app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppAppliedFiltersModule } from 'app/components/app-applied-filters/app-applied-filters.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: SalespointConsultaComponent, data: { title: 'Consulta' } },
  { path: 'nuevo', component: SalespointComponent, data: { title: 'Alta o Modificación de Punto de venta' } },
 
  // { path: 'editar', component: GuiasEditarComponent, data: { title: 'Editar Guia' } },
  // { path: 'detalle/:id', component: GuiasDetalleComponent, data: { title: 'Guía N°' } }
];

@NgModule({
  declarations: [SalespointComponent, SalespointConsultaComponent],
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
    SalesPointService
]
})
export class SalespointModule { }
