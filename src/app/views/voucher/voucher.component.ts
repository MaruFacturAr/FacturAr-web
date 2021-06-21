import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { Company } from 'app/_models/company.model';
import { Counterfoil } from 'app/_models/counterfoil.model';
import { SalesPoint } from 'app/_models/sales.point.model';
import { Voucher } from 'app/_models/voucher.model';
import { AuthenticationService } from 'app/_services/authentication.service';
import { CompanyService } from 'app/_services/company.service';
import { CounterfoilService } from 'app/_services/counterfoil.service';
import { ExcelService } from 'app/_services/excel.service';
import { SalesPointService } from 'app/_services/sales.point.service';
import { VoucherService } from 'app/_services/voucher.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SessionStorageService } from 'ngx-webstorage';
import { BaseViewComponent } from '../base.view.component';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent extends BaseViewComponent implements OnInit {
 
  company: Company;
  voucher:Voucher;
  vouchers:Voucher[];
  sales_points = new Array<SalesPoint>();
  counterfoils = new Array<Counterfoil>();

  CMXFormGroup = new FormGroup({

    counterfoil_id: new FormControl('', Validators.required),
    sales_point_id: new FormControl('', Validators.required),
    name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]),
  });

  constructor(private _voucherService: VoucherService,
    private _companyService: CompanyService,
    private _salesPointService: SalesPointService,
    private _counterfoilService: CounterfoilService,
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
    this.vouchers = JSON.parse(sessionStorage.getItem('FAC-VOUCHERS'));
    this.voucher = JSON.parse(sessionStorage.getItem("FAC-VOUCHER"));
    
      if(this.counterfoils.length == 0){
        this._counterfoilService.getAll().subscribe((result) =>{
          this.counterfoils = result;
        });
      }

      if(this.sales_points.length == 0){
        this._salesPointService.getAll().subscribe((result) =>{
          this.sales_points = result;
        });
      }
   }

  ngOnInit(): void {
    if(this.voucher){
      this.translateVoucherToForm();
    }
  }

  translateVoucherToForm() {
    if (this.voucher) {
      this.CMXFormGroup.patchValue({
        name: this.voucher.name,
        counterfoil_id: this.voucher.counterfoil_id,
        sales_point_id: this.voucher.sales_point_id
      });
    }
  }

  map() {
    if (this.voucher === null) {
      this.voucher = new Voucher();
      this.voucher.id = 0;
      this.voucher.status_id = 1
      //this.item.created_date = moment(new Date()).toDate();
    }
    this.voucher.counterfoil_id = this.CMXFormGroup.get("counterfoil_id").value;
    this.voucher.sales_point_id = this.CMXFormGroup.get("sales_point_id").value;
    this.voucher.name = this.CMXFormGroup.get("name").value;
    this.voucher.company_id = this.company.id;
    this.voucher.userId = this.currentUser.id;

  }

  onSave() {
    this.map();
    this._voucherService.register(this.voucher).subscribe((result: Voucher) => {
      if(this.vouchers)
      {
      let vouchers = this.vouchers;
      const index = vouchers.findIndex(n => n.id === result.id);
      if (index !== -1) {
        vouchers[index] = result;
      }else{
        vouchers.push(result);
      }
      try {
        this.vouchers = vouchers;
        sessionStorage.setItem('FAC-VOUCHERS', JSON.stringify(vouchers));
      } catch (error) {
          console.warn("Session Storage - Storage OverQuoted");
          sessionStorage.removeItem("FAC-VOUCHERS");
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
