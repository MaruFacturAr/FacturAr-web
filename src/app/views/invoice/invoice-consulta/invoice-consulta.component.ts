import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { InvoiceActionComponent } from 'app/components/invoice-action/invoice-action.component';
import { BaseViewComponent } from 'app/views/base.view.component';
import { CMXAnimations } from 'app/_helpers/animations';
import { Invoice } from 'app/_models/invoice.model';
import { AuthenticationService } from 'app/_services/authentication.service';
import { ExcelService } from 'app/_services/excel.service';
import { InvoiceService } from 'app/_services/invoice.service';
import { CMXConfig } from 'config/config';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { PDFSource } from 'ng2-pdf-viewer';
import { AppPdfViewerComponent } from 'app/components/advanced/app-pdf-viewer/app-pdf-viewer.component';

@Component({
  selector: 'app-invoice-consulta',
  templateUrl: './invoice-consulta.component.html',
  styleUrls: ['./invoice-consulta.component.scss'],
  animations: [ CMXAnimations ]
})
export class InvoiceConsultaComponent extends BaseViewComponent implements OnInit {
  invoices:any;
  filtros:any;
 
   CMXFormGroup = new FormGroup({
 
     code: new FormControl('',  Validators.maxLength(10)),
     name: new FormControl('',  Validators.maxLength(100)),
     
   });
   @ViewChild("smartTable") smartTable: ElementRef;
 
   constructor(private _invoiceService: InvoiceService,
     private _modalService: BsModalService,
     _router: Router,
     _excelService: ExcelService,
      _notificationService: NotifierService,
     _authenticationService: AuthenticationService,
     _translateService: TranslateService,
     _sessionStorageService: SessionStorageService,
     _cfr: ComponentFactoryResolver,
     _vcr: ViewContainerRef) {
     super(
       _notificationService,
       _excelService,
       _authenticationService,
       _translateService,
       _router,
       _sessionStorageService
     ); 
    
     this.invoices = JSON.parse(sessionStorage.getItem('FAC-INVOICES'));
     this.filtros = JSON.parse(sessionStorage.getItem('FAC-INVOICES-FILTROS'));
   }
 
   ngOnInit() {
     
     if (this.filtros) {
       this.loadDataFromStorage();
     } else {
       if (this.getRoleForInitialSearch()) {
         setTimeout(() => {
           this.doFormSearch();
         }, 600);
       } else {
         this.showFormSearch = true;
         this.isFirstSearch = false;
       }
     }
   }
 
   doSearch(){
     this.page = 1;
     this.isFirstSearch = false;
     this.doFormSearch();
 }
 
   doFormSearch() {
     this._invoiceService.getAllByCodeOrName(this.CMXFormGroup.value).subscribe((result:any) => {
 
   this.createFormFiltersTags(this.CMXFormGroup);
 
         if (result && result.length > 0) {
 
             this.showResult = true;
             this.showFormSearch = false;
 
             try {
                 this.invoices = result;
                 sessionStorage.setItem('FAC-INVOICES', JSON.stringify(result));
             } catch (error) {
                 console.warn("Session Storage - Storage OverQuoted");
                 sessionStorage.removeItem("FAC-INVOICES");
             }
 
             this.totalRows = result.length;
 
             this.filtros = Object.assign({}, this.CMXFormGroup.value);
             sessionStorage.setItem('FAC-VOUCHERS-FILTROS', JSON.stringify(this.filtros));
 
             this.source.load(result);
             this.calculatePaginatorText(1, this.totalRows);
             this.setPaginationPosition();
 
         } else {
             this._notificationService.notify('warning','No hay datos disponibles para su búsqueda');
             this.resetForm();
         }
     },
     error => {
         this._notificationService.notify('error',error);
     });
     return false;
 }
 
   loadDataFromStorage() {
 
     this.showResult = true;
     this.isFirstSearch = false;
     this.totalRows = this.invoices.length;
     
     this.source.load(this.invoices);
     
     if(this.filtros.tableFilters){
 
       this.source.setFilter(this.filtros.tableFilters, false);
       if(this.filtros.pagina && this.filtros.pagina > 1){
         setTimeout(() => {
           this.source.setPage(this.filtros.pagina);
         }, 500);  
       }
     }
 
     if(!this.filtros.tableFilters && this.filtros.pagina) {
       setTimeout(() => {
         this.source.setPage(this.filtros.pagina);
       }, 500);
     } else {
       this.calculatePaginatorText(1, this.totalRows);
     }
 
     this.setPaginationPosition();
     
     Object.keys(this.filtros).forEach(key => { 
       const ctrl = this.CMXFormGroup.get(key);
       
       if(ctrl != null) {
         this.CMXFormGroup.get(key).setValue(this.filtros[key]);
       }
     })
   
 
     this.createFormFiltersTags(this.CMXFormGroup.value);
 
 }
 
 
 loadFromServer(invoices: Invoice[]) {
   this.createFormFiltersTags(this.CMXFormGroup);
 
   try {
     this.invoices = invoices;
     sessionStorage.setItem('FAC-INVOICESS', JSON.stringify(invoices));
   } catch (error) {
       console.warn("Session Storage - Storage OverQuoted");
       sessionStorage.removeItem("FAC-INVOICES");
   }
 
   this.totalRows = invoices.length;
 
   this.filtros = Object.assign({}, this.CMXFormGroup.value);
   sessionStorage.setItem('FAC-INVOICES-FILTROS', JSON.stringify(this.filtros));
 
   this.source.load(invoices);
   this.calculatePaginatorText(1, this.totalRows);
   this.setPaginationPosition();
 
   if (invoices.length > 0) {
       this.showResult = true;
       this.showFormSearch = false;
   } else {
       if (!this.isFirstSearch) {
           this._notificationService.notify('warning', this._translateService.instant('CMXError.Error_000'));
       } else {
           this._notificationService.notify('warning', this._translateService.instant('CMXError.Error_202'));
       }
       this.resetForm();
   }
 }
 
   resetFilters() {
     this.CMXFormGroup.reset();
     this.resetForm();
   }
   protected observableForExcelReport() {
 
     if(this.invoices){
         
         const simpleObservable = new Observable((observer) => {
             observer.next(this.invoices);
             observer.complete()
         })
     
         return simpleObservable;
     }
 
     return this._invoiceService.getAllByCodeOrName(this.CMXFormGroup.value);
 
   }
   protected getExcelDataColumns() {
     
     let dataColumns:any = {
       id: 'id',
       name: 'Nombre'
   };
    return dataColumns;
   }

   protected getExcelReportName() {
     return 'invoice';
   }
   protected getExcludedExcelDataColumns() {
     return ['sales_point_id','counterfoil_id', 'status_id', 'company_id', 'userId'];
   }
 
   protected pageChanged(data: any) {
     throw new Error('Method not implemented.');
   }
   protected getDataColumns() {
     let dataColumns:any = {
       actions: {
        type:'custom', 
        editable: false,
        filter:false,
        width: '50px',
        renderComponent: InvoiceActionComponent,
        onComponentInitFunction: (instance) => {
  
          instance.viewFactura.subscribe((row) => {

            let pdfObject:PDFSource = {
              url : CMXConfig.environment.apiURL  + '/invoices/pdfDummy/1',
              httpHeaders: {
                'Content-Type' : 'application/json; charset=utf-8',
                'Accept' : 'application/json',
                Authorization: `Bearer ${this._authenticationService.getToken() }`
              }
          }
     
        
            
            let modalConfig:any = {
                initialState: { rowData:row, pdfObj: pdfObject, filename: 'Factura_' + row.number},
                class:'modal-lg'
            }

            this.bsModalRef = this._modalService.show(AppPdfViewerComponent, modalConfig);

          }
        );
      }
      },  
       id: { title: 'id'},
       number: { title: 'Numero'},
   
 
   }
   return dataColumns;
   }
 
 }