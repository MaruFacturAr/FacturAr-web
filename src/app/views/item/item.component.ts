import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'app/_services/authentication.service';
import { CompanyService } from 'app/_services/company.service';
import { ExcelService } from 'app/_services/excel.service';
import { ItemService } from 'app/_services/item.service';
import { SnotifyService } from 'ng-snotify';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SessionStorageService } from 'ngx-webstorage';
import { BaseViewComponent } from '../base.view.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent extends BaseViewComponent implements OnInit {
  
  item_types=[{id:'1', name:'Producto'},
  {id:'2', name:'Servicio'},
  {id:'3', name:'Producto y Servicio'}];

  CMXFormGroup = new FormGroup({

    code: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    alternative_code: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    item_type_id: new FormControl('', Validators.required),
    name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    price: new FormControl('', [Validators.required, Validators.pattern(new RegExp(/^\d+$/))]),
    currency_id: new FormControl('', Validators.required),
    status_id: new FormControl('', Validators.required),
    
  });
  constructor(private _itemService: ItemService,
    private _companyService: CompanyService,
    private _modalService: BsModalService,
    _router: Router,
    _excelService: ExcelService,
    _notificationService: SnotifyService,
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
    ); }

  ngOnInit() {
  }

  protected observableForExcelReport() {
    throw new Error('Method not implemented.');
  }
  protected getExcelDataColumns() {
    throw new Error('Method not implemented.');
  }
  protected getExcelReportName() {
    throw new Error('Method not implemented.');
  }
  protected getExcludedExcelDataColumns() {
    throw new Error('Method not implemented.');
  }
  protected pageChanged(data: any) {
    throw new Error('Method not implemented.');
  }
  protected getDataColumns() {
    throw new Error('Method not implemented.');
  }


}
