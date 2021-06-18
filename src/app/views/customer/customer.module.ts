import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerConsultaComponent } from './customer-consulta/customer-consulta.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'app/app.module';
import { HttpClient } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppAppliedFiltersModule } from 'app/components/app-applied-filters/app-applied-filters.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from 'app/_services/customer.service';
import { DocumentTypeService } from 'app/_services/document.type.service';
import { VoucherTypeService } from 'app/_services/voucher.type.service';

const routes: Routes = [
  { path: '', component: CustomerConsultaComponent, data: { title: 'Consulta' } },
  { path: 'nuevo', component: CustomerComponent, data: { title: 'Alta o Modificación de Cliente' } },
 
  // { path: 'editar', component: GuiasEditarComponent, data: { title: 'Editar Guia' } },
  // { path: 'detalle/:id', component: GuiasDetalleComponent, data: { title: 'Guía N°' } }
];

@NgModule({
  declarations: [CustomerComponent, CustomerConsultaComponent],
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
      CustomerService,
      DocumentTypeService,
      VoucherTypeService
  ]
})
export class CustomerModule { }
