import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { CMXAnimations } from 'app/_helpers/animations';
import { Company } from 'app/_models/company.model';
import { Counterfoil } from 'app/_models/counterfoil.model';
import { Customer } from 'app/_models/customer.model';
import { Invoice } from 'app/_models/invoice.model';
import { SalesPoint } from 'app/_models/sales.point.model';
import { Voucher } from 'app/_models/voucher.model';
import { AuthenticationService } from 'app/_services/authentication.service';
import { CompanyService } from 'app/_services/company.service';
import { CounterfoilService } from 'app/_services/counterfoil.service';
import { CustomerService } from 'app/_services/customer.service';
import { ExcelService } from 'app/_services/excel.service';
import { InvoiceService } from 'app/_services/invoice.service';
import { SalesPointService } from 'app/_services/sales.point.service';
import { VoucherService } from 'app/_services/voucher.service';
import { sub } from 'date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SessionStorageService } from 'ngx-webstorage';
import { BaseViewComponent } from '../base.view.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  animations: [ CMXAnimations ]
})
export class InvoiceComponent extends BaseViewComponent implements OnInit {

  company: Company;
  customers = new Array<Customer>();
  vouchers = new Array<Voucher>();
  counterfoils = new Array<Counterfoil>();
  salesPoints = new Array<SalesPoint>();
  salesCondition:Array<any> = [
  {id:1, name:"Contado", days:0},
  {id:2, name:"Cuenta Corriente a 30 días", days:30},
  {id:3, name:"Cuenta Corriente a 90 días", days:90},
  {id:4, name:"Tarjeta de crédito", days:0},
  {id:5, name:"Tarjeta de Dédito", days:0},
  {id:6, name:"Otros", days:0},
];
currency: any = [{ id: 2, name: 'Pesos' }, { id: 3, name: 'Dólar' }];

item_types = [{ id: 1, name: 'Productos' },
{ id: 2, name: 'Servicios' },
{ id: 3, name: 'Productos y Servicios' }];

  CMXFormGroup = new FormGroup({

    //fantasy_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    //legal_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    customer_id: new FormControl('', Validators.required),
    voucher_id: new FormControl('', Validators.required),
    counterfoil_id: new FormControl('', Validators.required),
    sale_point_id: new FormControl('', Validators.required),
    sale_condition_id: new FormControl('', Validators.required),
    currencyId: new FormControl('', Validators.required),
    item_type: new FormControl('', Validators.required),
    number: new FormControl(0, [Validators.required, Validators.pattern(new RegExp(/^\d+$/))]),
    
    //letter: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),

    emision_date: new FormControl(new Date(), Validators.required),
    expiration_date: new FormControl(new Date(), Validators.required),
    service_date: new FormControl(this.selectedDate, Validators.required),      
    total_amount: new FormControl(0, [Validators.required, Validators.pattern(new RegExp(/^\d+$/))]),
    amount_net: new FormControl(0, [Validators.required, Validators.pattern(new RegExp(/^\d+$/))]),
    total_taxes: new FormControl(0, [Validators.required, Validators.pattern(new RegExp(/^\d+$/))]),
    total_ivas: new FormControl(0, [Validators.required, Validators.pattern(new RegExp(/^\d+$/))]),

  });
  constructor(private _invoiceService: InvoiceService,
    private _customerService: CustomerService,
    private _voucherService: VoucherService,
    private _counterfoilService: CounterfoilService,
    private _salesPointService: SalesPointService,
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
     //this.customers = JSON.parse(sessionStorage.getItem('FAC-CUSTOMERS'));
    //this.customer = JSON.parse(sessionStorage.getItem("FAC-CUSTOMER"));
    
    if(this.customers.length == 0)
    this._customerService.getAll().subscribe((result) =>{
      this.customers = result;
    });

    if(this.counterfoils.length == 0)
    this._counterfoilService.getAll().subscribe((result) =>{
      this.counterfoils = result;
    });

    if(this.salesPoints.length == 0)
    this._salesPointService.getAll().subscribe((result) =>{
      this.salesPoints = result;
    });

    if(this.vouchers.length == 0)
    this._voucherService.getAll().subscribe((result) =>{
      this.vouchers = result;
    });

   
     
  }

  ngOnInit() {

    
   
  }

  // translateCustomerToForm() {
  //   if (this.customer) {
  //     this.CMXFormGroup.patchValue({
        
  //       fantasy_name: this.customer.billing_data_id.fantasy_name,
  //       legal_name: this.customer.billing_data_id.legal_name,
  //       document_type_id: this.customer.billing_data_id.document.document_type_id,
  //       number: this.customer.billing_data_id.document.number,
  //       taxpayer_type_id: this.customer.billing_data_id.taxpayer_type_id,
  //       email: this.customer.billing_data_id.email,
  //       country_code: this.customer.billing_data_id.phone.country_code,
  //       city_code: this.customer.billing_data_id.phone.city_code,
  //       phone_number: this.customer.billing_data_id.phone.number,
  //       extension: this.customer.billing_data_id.phone.extension,
  //       street: this.customer.billing_data_id.address.street,
  //       city: this.customer.billing_data_id.address.city,
  //       province: this.company.billingData.address.province_id
  //     });
  //   }
  // }

  map():Invoice{
    let invoice = new Invoice();
    return invoice;
    // if(this.customer == null)
    // {
    //   this.initialCustomer();
    // }
    
    // this.customer.billing_data_id.fantasy_name = this.CMXFormGroup.get("fantasy_name").value;
    // this.customer.billing_data_id.legal_name = this.CMXFormGroup.get("legal_name").value;
    // this.customer.billing_data_id.document.document_type_id = this.CMXFormGroup.get("document_type_id").value;
    // this.customer.billing_data_id.document.number = this.CMXFormGroup.get("number").value;
    // this.customer.billing_data_id.taxpayer_type_id = this.CMXFormGroup.get("taxpayer_type_id").value;
    // this.customer.billing_data_id.email = this.CMXFormGroup.get("email").value;
    // this.customer.billing_data_id.address.country_id=61;
    // this.customer.billing_data_id.address.address_type_id =2;
    // this.customer.billing_data_id.address.city = this.CMXFormGroup.get("city").value;
    // this.customer.billing_data_id.address.street = this.CMXFormGroup.get("street").value;
    // this.customer.billing_data_id.address.province_id = this.CMXFormGroup.get("province").value;
    // this.customer.billing_data_id.phone.phone_type_id = 1;
    // this.customer.billing_data_id.phone.city_code = this.CMXFormGroup.get("city_code").value;
    // this.customer.billing_data_id.phone.country_code = this.CMXFormGroup.get("country_code").value;
    // this.customer.billing_data_id.phone.extension = this.CMXFormGroup.get("extension").value;
    // this.customer.billing_data_id.phone.number = this.CMXFormGroup.get("phone_number").value;
    // this.customer.company_id = this.company.id;
    // this.customer.status_id = 1;
    // this.customer.userId = this.currentUser.id;

  }
  

  onSave(){
    
    this._invoiceService.register(this.map()).subscribe((result:Invoice)=>{
     
        this.CMXFormGroup.reset();
        this._notificationService.notify('success', "Se grabó correctamente");
      }, error => {
        this._notificationService.notify('error', error);
      });

  }

  changeDays(days:number, control:string){
    const from:Date = sub(new Date(), {days: days});
    const to:Date = new Date();

    this.CMXFormGroup.get(control).setValue([from, to]);
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
