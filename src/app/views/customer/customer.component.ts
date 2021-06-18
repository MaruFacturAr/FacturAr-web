import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { BillingData } from 'app/_models/billing.data.model';
import { Company } from 'app/_models/company.model';
import { Document } from 'app/_models/document.model';
import { Customer } from 'app/_models/customer.model';
import { ProvinceModel } from 'app/_models/province.model';
import { TaxpayerType } from 'app/_models/taxpayer.type.model';
import { AuthenticationService } from 'app/_services/authentication.service';
import { CompanyService } from 'app/_services/company.service';
import { CustomerService } from 'app/_services/customer.service';
import { DocumentTypeService } from 'app/_services/document.type.service';
import { ExcelService } from 'app/_services/excel.service';
import { ProvinceService } from 'app/_services/province.service';
import { TaxpayerTypeService } from 'app/_services/taxpayer.type.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SessionStorageService } from 'ngx-webstorage';
import { BaseViewComponent } from '../base.view.component';
import { Address } from 'app/_models/address.model';
import { Phone } from 'app/_models/phone.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent extends BaseViewComponent implements OnInit {

  company: Company;
  customer: Customer;
  customers:Customer[];
  provinces = new Array<ProvinceModel>();
  taxpayerTypes = new Array<TaxpayerType>();
  documentTypes = new Array<DocumentType>();
  
  CMXFormGroup = new FormGroup({

    fantasy_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    legal_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    taxpayer_type_id: new FormControl('', Validators.required),
    document_type_id: new FormControl('', Validators.required),
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
  constructor(private _customerService: CustomerService,
    private _provinceService: ProvinceService,
    private _taxpayerTypeService: TaxpayerTypeService,
    private _documentTypeService: DocumentTypeService,
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
    this.customers = JSON.parse(sessionStorage.getItem('FAC-CUSTOMERS'));
    this.customer = JSON.parse(sessionStorage.getItem("FAC-CUSTOMER"));
    
    if(this.provinces.length == 0)
    this._provinceService.getAll().subscribe((result) =>{
      this.provinces = result;
    });

    if(this.taxpayerTypes.length == 0)
    this._taxpayerTypeService.getAll().subscribe((result) =>{
      this.taxpayerTypes = result;
    });

    if(this.documentTypes.length == 0)
    this._documentTypeService.getAll().subscribe((result) =>{
      this.documentTypes = result;
    });

    // if (this.company == null) {
    //   this._companyService.get().subscribe((result:Company) => {
    //     if (result) {
    //       this.company = result;
    //       sessionStorage.setItem("FAC-COMPANY", JSON.stringify(result));
    //       this.translateCompanyToForm();
    //     }
    //   });

    // }else{
    //   this.translateCompanyToForm();
    // }
     
  }

  ngOnInit() {

    if(this.customer){
      
      this.translateCustomerToForm();

      }
   
  }

  translateCustomerToForm() {
    if (this.customer) {
      this.CMXFormGroup.patchValue({
        
        fantasy_name: this.customer.billing_data_id.fantasy_name,
        legal_name: this.customer.billing_data_id.legal_name,
        document_type_id: this.customer.billing_data_id.document.document_type_id,
        number: this.customer.billing_data_id.document.number,
        taxpayer_type_id: this.customer.billing_data_id.taxpayer_type_id,
        email: this.customer.billing_data_id.email,
        country_code: this.customer.billing_data_id.phone.country_code,
        city_code: this.customer.billing_data_id.phone.city_code,
        phone_number: this.customer.billing_data_id.phone.number,
        extension: this.customer.billing_data_id.phone.extension,
        street: this.customer.billing_data_id.address.street,
        city: this.customer.billing_data_id.address.city,
        province: this.company.billingData.address.province_id
      });
    }
  }

  map(){
    if(this.customer == null)
    {
      this.initialCustomer();
    }
    
    this.customer.billing_data_id.fantasy_name = this.CMXFormGroup.get("fantasy_name").value;
    this.customer.billing_data_id.legal_name = this.CMXFormGroup.get("legal_name").value;
    this.customer.billing_data_id.document.document_type_id = this.CMXFormGroup.get("document_type_id").value;
    this.customer.billing_data_id.document.number = this.CMXFormGroup.get("number").value;
    this.customer.billing_data_id.taxpayer_type_id = this.CMXFormGroup.get("taxpayer_type_id").value;
    this.customer.billing_data_id.email = this.CMXFormGroup.get("email").value;
    this.customer.billing_data_id.address.country_id=61;
    this.customer.billing_data_id.address.address_type_id =2;
    this.customer.billing_data_id.address.city = this.CMXFormGroup.get("city").value;
    this.customer.billing_data_id.address.street = this.CMXFormGroup.get("street").value;
    this.customer.billing_data_id.address.province_id = this.CMXFormGroup.get("province").value;
    this.customer.billing_data_id.phone.phone_type_id = 1;
    this.customer.billing_data_id.phone.city_code = this.CMXFormGroup.get("city_code").value;
    this.customer.billing_data_id.phone.country_code = this.CMXFormGroup.get("country_code").value;
    this.customer.billing_data_id.phone.extension = this.CMXFormGroup.get("extension").value;
    this.customer.billing_data_id.phone.number = this.CMXFormGroup.get("phone_number").value;
    this.customer.company_id = this.company.id;
    this.customer.status_id = 1;
    this.customer.userId = this.currentUser.id;

  }
  initialCustomer() {
    this.customer = new Customer();
    this.customer.id = 0;
    this.customer.userId = this.currentUser.id;
    this.customer.billing_data_id= new BillingData();
    this.company.billingData.id = 0;
    this.customer.billing_data_id.document = new Document();
    this.customer.billing_data_id.document.id = 0;
    this.customer.billing_data_id.document.country_id = 61;
    this.customer.billing_data_id.address = new Address();
    this.customer.billing_data_id.address.id = 0;
    this.customer.billing_data_id.phone = new Phone();
    this.customer.billing_data_id.phone.id = 0;
  }

  onSave(){
    this.map();
    this._customerService.register(this.customer).subscribe((result:Customer)=>{
      if(this.customers)
      {
      let customers = this.customers;
      const index = customers.findIndex(n => n.id === result.id);
      if (index !== -1) {
        customers[index] = result;
      }else{
        customers.push(result);
      }
      try {
        this.customers = customers;
        sessionStorage.setItem('FAC-CUSTOMERS', JSON.stringify(customers));
      } catch (error) {
          console.warn("Session Storage - Storage OverQuoted");
          sessionStorage.removeItem("FAC-ITEMS");
      }

    }
        this.CMXFormGroup.reset();
        this._notificationService.notify('success', "Se grabó correctamente");
      }, error => {
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

