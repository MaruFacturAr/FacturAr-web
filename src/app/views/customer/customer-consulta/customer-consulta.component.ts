import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { ActionsTableComponent } from 'app/components/action-table/action.table.component';
import { AppModalComponent } from 'app/components/app-modal/app-modal.component';
import { FlagTableComponent } from 'app/components/flag-table/flag-table.component';
import { BaseViewComponent } from 'app/views/base.view.component';
import { CMXAnimations } from 'app/_helpers/animations';
import { Customer } from 'app/_models/customer.model';
import { AuthenticationService } from 'app/_services/authentication.service';
import { CustomerService } from 'app/_services/customer.service';
import { ExcelService } from 'app/_services/excel.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-consulta',
  templateUrl: './customer-consulta.component.html',
  styleUrls: ['./customer-consulta.component.scss'],
  animations: [ CMXAnimations ]
})
export class CustomerConsultaComponent  extends BaseViewComponent implements OnInit {
  customers:any;
  filtros:any;
 
   CMXFormGroup = new FormGroup({
 
     code: new FormControl('',  Validators.maxLength(10)),
     name: new FormControl('',  Validators.maxLength(100)),
     
   });
   @ViewChild("smartTable") smartTable: ElementRef;
 
   constructor(private _customerService: CustomerService,
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
    
     this.customers = JSON.parse(sessionStorage.getItem('FAC-CUSTOMERS'));
     this.filtros = JSON.parse(sessionStorage.getItem('FAC-CUSTORMERS-FILTROS'));
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
     this._customerService.getAllByCodeOrName(this.CMXFormGroup.value).subscribe((result:any) => {
 
   this.createFormFiltersTags(this.CMXFormGroup);
 
         if (result && result.length > 0) {
 
             this.showResult = true;
             this.showFormSearch = false;
 
             try {
                 this.customers = result;
                 sessionStorage.setItem('FAC-CUSTOMERS', JSON.stringify(result));
             } catch (error) {
                 console.warn("Session Storage - Storage OverQuoted");
                 sessionStorage.removeItem("FAC-CUSTOMERS");
             }
 
             this.totalRows = result.length;
 
             this.filtros = Object.assign({}, this.CMXFormGroup.value);
             sessionStorage.setItem('FAC-CUSTOMERS-FILTROS', JSON.stringify(this.filtros));
 
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
     this.totalRows = this.customers.length;
     
     this.source.load(this.customers);
     
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
 
 
 loadFromServer(customers: Customer[]) {
   this.createFormFiltersTags(this.CMXFormGroup);
 
   try {
     this.customers = customers;
     sessionStorage.setItem('FAC-CUSTOMERS', JSON.stringify(customers));
   } catch (error) {
       console.warn("Session Storage - Storage OverQuoted");
       sessionStorage.removeItem("FAC-CUSTOMERS");
   }
 
   this.totalRows = customers.length;
 
   this.filtros = Object.assign({}, this.CMXFormGroup.value);
   sessionStorage.setItem('FAC-CUSTOMERS-FILTROS', JSON.stringify(this.filtros));
 
   this.source.load(customers);
   this.calculatePaginatorText(1, this.totalRows);
   this.setPaginationPosition();
 
   if (customers.length > 0) {
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
 
     if(this.customers){
         
         const simpleObservable = new Observable((observer) => {
             observer.next(this.customers);
             observer.complete()
         })
     
         return simpleObservable;
     }
 
     return this._customerService.getAllByCodeOrName(this.CMXFormGroup.value);
 
   }
   protected getExcelDataColumns() {
     
     let dataColumns:any = {
       id: 'id',
       "billing_data_id.legal_name": 'Razon social',
       "billing_data_id.fantasy_name": 'Nombre comercial',
       "billing_data_id.email": 'Email'
   };
    return dataColumns;
   }
   activar(data: any) {
     let sinFactura:boolean = true
     if (sinFactura){
       const modal = this._modalService.show(AppModalComponent);
       
       (<AppModalComponent>modal.content).confirmLabel = 'SI';
       (<AppModalComponent>modal.content).cancelLabel = 'NO';
       (<AppModalComponent>modal.content).showConfirmationModal(
           'Atencion!',this._translateService.instant('CMXGuias.ActivateCustomerQuestion', {id: data.id}));
 
       (<AppModalComponent>modal.content).onClose.subscribe(result => {
         if (result === true) {
           this._customerService.activate(data).subscribe(
             (val:any) => { 
 
               let customers = this.customers;
 
               const index = customers.findIndex(n => n.id === val.id);
               if (index !== -1) {
                customers[index].status_id = val.status_id;
 
               //notificaciones = notificaciones.filter(n => n.estado !== notificacionEstado.Eliminada);
               this.loadFromServer(customers);
             this._notificationService.notify('success', this._translateService.instant('CMXGuias.ActivateCustomerSuccess', {id: data.id}));           
               
           }
             //sessionStorage.setItem('FAC-ITEMS', JSON.stringify(this.source));
           },
           error => {
             this._notificationService.notify('error', this._translateService.instant('CMXError.Error100'));
           });
           
         }
     });
   }
   }
   desactivar(data: any) {
     ;
     let sinFactura:boolean = true
     if (sinFactura){
       const modal = this._modalService.show(AppModalComponent);
       
       (<AppModalComponent>modal.content).confirmLabel = 'SI';
       (<AppModalComponent>modal.content).cancelLabel = 'NO';
       (<AppModalComponent>modal.content).showConfirmationModal(
           'Atencion!',this._translateService.instant('CMXGuias.DeactivateCustomerQuestion', {id: data.id}));
 
       (<AppModalComponent>modal.content).onClose.subscribe(result => {
         if (result === true) {
           this._customerService.deactivate(data).subscribe(
               (val:any) => { 
 
               let customers = this.customers;
 
               const index = customers.findIndex(n => n.id === val.id);
               if (index !== -1) {
                customers[index].status_id = val.status_id;
 
 
                 //notificaciones = notificaciones.filter(n => n.estado !== notificacionEstado.Eliminada);
                 this.loadFromServer(customers);
             this._notificationService.notify('success', this._translateService.instant('CMXGuias.DeactivateCustomerSuccess', {id: data.id}));           
               
               }
           },
           error => {
             this._notificationService.notify('error', this._translateService.instant('CMXError.Error100'));
           });
           
         }
     });
   }
   }
   delete(data: any) {
     let sinFactura:boolean = true
     if (sinFactura){
       const modal = this._modalService.show(AppModalComponent);
       
       (<AppModalComponent>modal.content).confirmLabel = 'SI';
       (<AppModalComponent>modal.content).cancelLabel = 'NO';
       (<AppModalComponent>modal.content).showConfirmationModal(
           'Atencion!',this._translateService.instant('CMXGuias.RemoveCustomerQuestion', {id: data.id}));
 
       (<AppModalComponent>modal.content).onClose.subscribe(result => {
         if (result === true) {
           this._customerService.delete(data.id).subscribe(
             (val) => { 
             this._notificationService.notify('success', this._translateService.instant('CMXGuias.RemoveCustomerSuccess', {id: data.id}));           
               
             this.showResult = false;
             
             this.source.remove(data);
               //sessionStorage.setItem('FAC-ITEMS', JSON.stringify(this.source));
           },
           error => {
             
             this._notificationService.notify('error', this._translateService.instant('CMXError.Error100'));
           });
           
         }
     });
   }
   }
   protected getExcelReportName() {
     return 'Customers';
   }
   protected getExcludedExcelDataColumns() {
     return ['phone', 'address', 'company_id', 'userId'];
   }
 
   protected pageChanged(data: any) {
     throw new Error('Method not implemented.');
   }
   protected getDataColumns() {
     let dataColumns:any = {
       actions: {
         type: 'custom',
         renderComponent: ActionsTableComponent,
         editable: false,
         filter:false,
         width:'50px',
         onComponentInitFunction: (instance) => {
 
           instance.eliminar.subscribe((row) => {                
             this.delete(row);
           });
 
           instance.modificar.subscribe((row) => {                
             
             sessionStorage.setItem('FAC-CUSTOMER', JSON.stringify(row));
             this.resetForm();
 
             this._router.navigate(['customer/nuevo']);
           });
           
           instance.activar.subscribe((row) => {                
             this.activar(row);
           });
 
           instance.desactivar.subscribe((row) => {                
             this.desactivar(row);
           });
         }  
       },  
       id: { title: 'id'},
       fantasy_name: { title: 'Nombre Comercial',
       type:'string',
       valuePrepareFunction: (cell, row) => {
        return row.billing_data_id.fantasy_name;
    }
      },
       legal_name: { title: 'Razon Social',
       type:'string',
       valuePrepareFunction: (cell, row) => {
        return row.billing_data_id.legal_name;
       }
      },
      email: { title: 'Email',
      type:'string',
       valuePrepareFunction: (cell, row) => {
        return row.billing_data_id.email;
       }
      },
       status_id : {  
         title: 'Estado', 
         type: 'custom',
         renderComponent: FlagTableComponent,
         valuePrepareFunction: (cell, row) =>  { 
           return { 
             status_id: cell
           } 
         },
         editable: false,
         filter:false,
         class: 'd-none d-md-table-cell'
       }
 
   }
   return dataColumns;
   }
 
 }
 