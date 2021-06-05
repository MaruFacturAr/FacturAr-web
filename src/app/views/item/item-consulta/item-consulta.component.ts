import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AmountComponent } from 'app/components/Amount/Amount.component';
import { BaseViewComponent } from 'app/views/base.view.component';
import { CMXAnimations } from 'app/_helpers/animations';
import { AuthenticationService } from 'app/_services/authentication.service';
import { ExcelService } from 'app/_services/excel.service';
import { ItemService } from 'app/_services/item.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-item-consulta',
  templateUrl: './item-consulta.component.html',
  styleUrls: ['./item-consulta.component.scss'],
  animations: [ CMXAnimations ]
})
export class ItemConsultaComponent extends BaseViewComponent implements OnInit {
 items:any;
 filtros:any;

  CMXFormGroup = new FormGroup({

    code: new FormControl('',  Validators.maxLength(20)),
    name: new FormControl('',  Validators.maxLength(100)),
    
  });
  @ViewChild("smartTable") smartTable: ElementRef;

  constructor(private _itemService: ItemService,
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
    this.items = JSON.parse(sessionStorage.getItem('FAC-ITEMS'));
    this.filtros = JSON.parse(sessionStorage.getItem('FAC-ITEMS-FILTROS'));
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
    this._itemService.getAllByCodeOrName(this.CMXFormGroup.value).subscribe((result:any) => {

  this.createFormFiltersTags(this.CMXFormGroup.value);

        if (result && result.length > 0) {

            this.showResult = true;
            this.showFormSearch = false;

            try {
                this.items = result;
                sessionStorage.setItem('FAC-ITEMS', JSON.stringify(result));
            } catch (error) {
                console.warn("Session Storage - Storage OverQuoted");
                sessionStorage.removeItem("FAC-ITEMS");
            }

            this.totalRows = result.length;

            this.filtros = Object.assign({}, this.CMXFormGroup.value);
            sessionStorage.setItem('FAC-ITEMS-FILTROS', JSON.stringify(this.filtros));

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
    this.totalRows = this.items.length;
    
    this.source.load(this.items);
    
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

  resetFilters() {
    this.CMXFormGroup.reset();
    this.resetForm();
  }
  protected observableForExcelReport() {

    if(this.items){
        
        const simpleObservable = new Observable((observer) => {
            observer.next(this.items);
            observer.complete()
        })
    
        return simpleObservable;
    }

    return this._itemService.getAllByCodeOrName(this.CMXFormGroup.value);

  }
  protected getExcelDataColumns() {
    
    let dataColumns:any = {
      id: 'id',
      code: 'Código',
      alternative_code: 'Código Alternativo',
      name: 'Nombre',
      description: 'Descripcion',
      price: 'Precio'
  };
   return dataColumns;
  }
  protected getExcelReportName() {
    return 'Items';
  }
  protected getExcludedExcelDataColumns() {
    return ['item_type_id','currency_id', 'status_id', 'created_date', 'modified_date', 'company_id', 'userId'];
  }

  protected pageChanged(data: any) {
    throw new Error('Method not implemented.');
  }
  protected getDataColumns() {
    let dataColumns:any = {
      id: { title: 'id'},
      code: { title: 'Código'},
      alternative_code: { title: 'Código Alternativo'},
      description: { title: 'Descripcion'},
      price: { title: 'Precio',  type: 'custom',
      renderComponent: AmountComponent,
      width: '80px'},

  }
  return dataColumns;
  }

}
