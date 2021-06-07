import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './item.component';
import { ItemConsultaComponent } from './item-consulta/item-consulta.component';
import { DateFnsModule } from 'ngx-date-fns';
//import { AppPdfViewerModule } from 'app/components/advanced/app-pdf-viewer/app-pdf-viewer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppAppliedFiltersModule } from 'app/components/app-applied-filters/app-applied-filters.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'app/app.module';
import { HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ItemService } from 'app/_services/item.service';
import { ActionsTableComponent } from 'app/components/action-table/action.table.component';
import { FlagTableComponent } from 'app/components/flag-table/flag-table.component';


const routes: Routes = [
  { path: '', component: ItemConsultaComponent, data: { title: 'Consulta' } },
  { path: 'nuevo', component: ItemComponent, data: { title: 'Alta Producto o Servicio' } },
 
  // { path: 'editar', component: GuiasEditarComponent, data: { title: 'Editar Guia' } },
  // { path: 'detalle/:id', component: GuiasDetalleComponent, data: { title: 'Guía N°' } }
];

@NgModule({
  declarations: [
    ItemComponent,
    ItemConsultaComponent,
    FlagTableComponent,
    ActionsTableComponent ],

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
    FlagTableComponent,
    ActionsTableComponent
],
  providers: [
    ItemService
]
})
export class ItemModule { }
