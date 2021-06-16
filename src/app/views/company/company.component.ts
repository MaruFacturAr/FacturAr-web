import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Company } from 'app/_models/company.model';
import { ProvinceModel } from 'app/_models/province.model';
import { TaxpayerType } from 'app/_models/taxpayer.type.model';
import { AuthenticationService } from 'app/_services/authentication.service';
import { CompanyService } from 'app/_services/company.service';
import { ExcelService } from 'app/_services/excel.service';
import { ProvinceService } from 'app/_services/province.service';
import { TaxpayerTypeService } from 'app/_services/taxpayer.type.service';
import { BsModalService } from "ngx-bootstrap/modal";
import { SessionStorageService } from 'ngx-webstorage';
import { BaseViewComponent } from '../base.view.component';
import { BillingData } from 'app/_models/billing.data.model';
import { Address } from 'app/_models/address.model';
import { Phone } from 'app/_models/phone.model';
import { Document } from 'app/_models/document.model';
import { format, set, sub } from 'date-fns';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent extends BaseViewComponent implements OnInit {

  company: Company;
  provinces = new Array<ProvinceModel>();
  taxpayerTypes = new Array<TaxpayerType>();
  CMXFormGroup = new FormGroup({

    iibb_code: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    initial_date: new FormControl('', Validators.required),
    fantasy_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    legal_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    taxpayer_type_id: new FormControl('', Validators.required),
    number: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(new RegExp(/^\d+$/))]),
    email: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(200)]),
    country_code: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    city_code: new FormControl('', [Validators.required, Validators.pattern(new RegExp(/^\d+$/))]),
    phone_number: new FormControl(0, [Validators.required, Validators.pattern(new RegExp(/^\d+$/))]),
    extension: new FormControl(0, [Validators.required, Validators.pattern(new RegExp(/^\d+$/))]),
    street: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]),
    city: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    province: new FormControl('', Validators.required),

  });
  constructor(private _provinceService: ProvinceService,
    private _taxpayerTypeService: TaxpayerTypeService,
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
    
    if(this.provinces.length == 0)
    this._provinceService.getAll().subscribe((result) =>{
      this.provinces = result;
    });

    if(this.taxpayerTypes.length == 0)
    this._taxpayerTypeService.getAll().subscribe((result) =>{
      this.taxpayerTypes = result;
    });

    if (this.company == null) {
      this._companyService.get().subscribe((result:Company) => {
        if (result) {
          this.company = result;
          sessionStorage.setItem("FAC-COMPANY", JSON.stringify(result));
          this.translateCompanyToForm();
        }
      });

    }else{
      this.translateCompanyToForm();
    }
     
  }

  ngOnInit() {

   
  }

  translateCompanyToForm() {
    if (this.company) {
      this.CMXFormGroup.patchValue({
        iibb_code: this.company.iibb_code,
        initial_date: format(set(new Date(this.company.initial_date), { hours:0, minutes:0, seconds: 0}), "yyyy-MM-dd'T'HH:mm:ss"),
        fantasy_name: this.company.billingData.fantasy_name,
        legal_name: this.company.billingData.legal_name,
        number: this.company.billingData.document.number,
        taxpayer_type_id: this.company.billingData.taxpayer_type_id,
        email: this.company.billingData.email,
        country_code: this.company.billingData.phone.country_code,
        city_code: this.company.billingData.phone.city_code,
        phone_number: this.company.billingData.phone.number,
        extension: this.company.billingData.phone.extension,
        street: this.company.billingData.address.street,
        city: this.company.billingData.address.city,
        province: this.company.billingData.address.province_id
      });
    }
  }

  map(){
    if(this.company == null)
    {
      this.initialCompany();
    }
    
    this.company.iibb_code = this.CMXFormGroup.get("iibb_code").value;
    this.company.initial_date = this.CMXFormGroup.get("initial_date").value;
    this.company.billingData.fantasy_name = this.CMXFormGroup.get("fantasy_name").value;
    this.company.billingData.legal_name = this.CMXFormGroup.get("legal_name").value;
    this.company.billingData.document.number = this.CMXFormGroup.get("number").value;
    this.company.billingData.taxpayer_type_id = this.CMXFormGroup.get("taxpayer_type_id").value;
    this.company.billingData.email = this.CMXFormGroup.get("email").value;
    this.company.billingData.address.country_id=61;
    this.company.billingData.address.address_type_id =2;
    this.company.billingData.address.city = this.CMXFormGroup.get("city").value;
    this.company.billingData.address.street = this.CMXFormGroup.get("street").value;
    this.company.billingData.address.province_id = this.CMXFormGroup.get("province").value;
    this.company.billingData.phone.phone_type_id = 1;
    this.company.billingData.phone.city_code = this.CMXFormGroup.get("city_code").value;
    this.company.billingData.phone.country_code = this.CMXFormGroup.get("country_code").value;
    this.company.billingData.phone.extension = this.CMXFormGroup.get("extension").value;
    this.company.billingData.phone.number = this.CMXFormGroup.get("phone_number").value;


  }
  initialCompany() {
    this.company = new Company();
    this.company.id = 0;
    this.company.userId = this.currentUser.id;
    this.company.billingData = new BillingData();
    this.company.billingData.id = 0;
    this.company.billingData.document = new Document();
    this.company.billingData.document.id = 0;
    this.company.billingData.document.country_id = 61;
    this.company.billingData.document.document_type_id = 1;
    this.company.billingData.address = new Address();
    this.company.billingData.address.id = 0;
    this.company.billingData.phone = new Phone();
    this.company.billingData.phone.id = 0;
  }

  onSave(){
    this.map();
    this._companyService.register(this.company).subscribe((result:Company)=>{
      this.company = result;
      sessionStorage.setItem("FAC-COMPANY", JSON.stringify(result));
      this._notificationService.notify('success', 'Se grabó correctamente');

    }, error=>{this._notificationService.notify('error', error);});

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
