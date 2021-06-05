import { ResourceLoader } from '@angular/compiler';
import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { Company } from 'app/_models/company.model';
import { Item } from 'app/_models/item.model';
import { AuthenticationService } from 'app/_services/authentication.service';
import { CompanyService } from 'app/_services/company.service';
import { ExcelService } from 'app/_services/excel.service';
import { ItemService } from 'app/_services/item.service';
import { it } from 'date-fns/locale';
import moment from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SessionStorageService } from 'ngx-webstorage';
import { BaseViewComponent } from '../base.view.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent extends BaseViewComponent implements OnInit {
  
  company:Company;
  item_types=[{id:1, name:'Producto'},
  {id:2, name:'Servicio'},
  {id:3, name:'Producto y Servicio'}];
  currency:any=[{id:2, name:'PESOS'}, {id:3, name:'Dólar ESTADOUNIDENSE'}];

  CMXFormGroup = new FormGroup({

    code: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    alternative_code: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    item_type_id: new FormControl('', Validators.required),
    name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    price: new FormControl('', [Validators.required, Validators.pattern(new RegExp(/^\d+$/))]),
    currency_id: new FormControl('', Validators.required),
   // status_id: new FormControl('', Validators.required),
    
  });
  constructor(private _itemService: ItemService,
    private _companyService: CompanyService,
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
   
    this.company = JSON.parse(sessionStorage.getItem("FAC-COMPANY"));
  }

  ngOnInit() {
  }

  map():Item{
    let item = new Item();
    item.id = 0;
    item.code = this.CMXFormGroup.get("code").value;
    item.alternative_code = this.CMXFormGroup.get("alternative_code").value;
    item.name = this.CMXFormGroup.get("name").value;
    item.item_type_id = this.CMXFormGroup.get("item_type_id").value;
    item.status_id = 1
    item.company_id = this.company.id;
    item.price = this.CMXFormGroup.get("price").value;
    item.description = this.CMXFormGroup.get("description").value;
    item.currency_id = this.CMXFormGroup.get("currency_id").value;
    item.created_date = moment(new Date()).toDate();
    item.modified_date = moment(new Date()).toDate();
    return item;
  }

  onSave(){
    this._itemService.register(this.map()).subscribe((result:Company)=>{
      this._notificationService.notify('sucess', "Se grabó correctamente");
    }, error=>{
      this._notificationService.notify('error', error);
    });
  }
  protected observableForExcelReport() {
    
  }
  protected getExcelDataColumns() {
    
  }
  protected getExcelReportName() {
    
  }
  protected getExcludedExcelDataColumns() {
    
  }
  protected pageChanged(data: any) {
   
  }
  protected getDataColumns() {
   
  }


}