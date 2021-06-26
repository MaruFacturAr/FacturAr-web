import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { InvoiceConsultaComponent } from './invoice-consulta/invoice-consulta.component';
import { RouterModule, Routes } from '@angular/router';
import { DateFnsModule } from 'ngx-date-fns';
import { AppPdfViewerModule } from 'app/components/advanced/app-pdf-viewer/app-pdf-viewer.module';
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
import { InvoiceService } from 'app/_services/invoice.service';
import { CounterfoilService } from 'app/_services/counterfoil.service';
import { CustomerService } from 'app/_services/customer.service';
import { SalesPointService } from 'app/_services/sales.point.service';
import { VoucherService } from 'app/_services/voucher.service';

const routes: Routes = [
  { path: '', component: InvoiceConsultaComponent, data: { title: 'Consulta' } },
  { path: 'nuevo', component: InvoiceComponent, data: { title: 'Alta de Factura venta' } },
 
];

@NgModule({
  declarations: [InvoiceComponent, InvoiceConsultaComponent],
  imports: [
    CommonModule,
     DateFnsModule.forRoot(),
     AppPdfViewerModule,
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
     InvoiceService,
     CustomerService,
     CounterfoilService,
     SalesPointService,
     VoucherService
 ]
})
export class InvoiceModule { }
