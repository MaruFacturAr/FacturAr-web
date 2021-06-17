import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterfoilConsultaComponent } from './counterfoil-consulta/counterfoil-consulta.component';
import { RouterModule, Routes } from '@angular/router';
import { CounterfoilComponent } from './counterfoil.component';
import { CounterfoilService } from 'app/_services/counterfoil.service';
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
import { DateFnsModule } from 'ngx-date-fns';
import { VoucherTypeService } from 'app/_services/voucher.type.service';

const routes: Routes = [
  { path: '', component: CounterfoilConsultaComponent, data: { title: 'Consulta' } },
  { path: 'nuevo', component: CounterfoilComponent, data: { title: 'Alta o Modificación de Talonario' } },
 
  // { path: 'editar', component: GuiasEditarComponent, data: { title: 'Editar Guia' } },
  // { path: 'detalle/:id', component: GuiasDetalleComponent, data: { title: 'Guía N°' } }
];

@NgModule({
  declarations: [CounterfoilConsultaComponent, CounterfoilComponent ],

  imports: [
    CommonModule,
    DateFnsModule.forRoot(),
   // AppPdfViewerModule,
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
    CounterfoilService,
    VoucherTypeService
]
})
export class CounterfoilModule { }
