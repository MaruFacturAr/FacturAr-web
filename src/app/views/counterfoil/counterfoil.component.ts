import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { Company } from 'app/_models/company.model';
import { Counterfoil } from 'app/_models/counterfoil.model';
import { VoucherType } from 'app/_models/voucher.type.model';
import { AuthenticationService } from 'app/_services/authentication.service';
import { CompanyService } from 'app/_services/company.service';
import { CounterfoilService } from 'app/_services/counterfoil.service';
import { ExcelService } from 'app/_services/excel.service';
import { VoucherTypeService } from 'app/_services/voucher.type.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SessionStorageService } from 'ngx-webstorage';
import { BaseViewComponent } from '../base.view.component';

@Component({
  selector: 'app-counterfoil',
  templateUrl: './counterfoil.component.html',
  styleUrls: ['./counterfoil.component.scss']
})
export class CounterfoilComponent extends BaseViewComponent implements OnInit {
 
  company: Company;
  counterfoil:Counterfoil;
  counterfoils:Counterfoil[];
  voucher_types = new Array<VoucherType>();

  CMXFormGroup = new FormGroup({

    code: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
    name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    from_number: new FormControl(0, [Validators.required, Validators.pattern(new RegExp(/^\d+$/))]),
    voucher_type_id: new FormControl('', Validators.required),
   
    next_number: new FormControl(0, [Validators.required, Validators.pattern(new RegExp(/^\d+$/))]),
    to_number: new FormControl(0, [Validators.required, Validators.maxLength(8), Validators.pattern(new RegExp(/^\d+$/))]),
   
  });

  constructor(private _counterfoilService: CounterfoilService,
    private _voucherTypeService: VoucherTypeService,
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
    this.counterfoils = JSON.parse(sessionStorage.getItem('FAC-COUNTERFOILS'));
    this.counterfoil = JSON.parse(sessionStorage.getItem("FAC-COUNTERFOIL"));
    if(this.voucher_types.length == 0)
    this._voucherTypeService.getAll().subscribe((result) =>{
      this.voucher_types = result;
    });


   }

  ngOnInit(): void {
    if(this.counterfoil){
      this.translateCounterfoilToForm();
    }
  }

  translateCounterfoilToForm() {
    if (this.counterfoil) {
      this.CMXFormGroup.patchValue({
        code: this.counterfoil.code,
        from_number: this.counterfoil.from_number,
        name: this.counterfoil.name,
        next_number: this.counterfoil.next_number,
        to_number: this.counterfoil.to_number,
        voucher_type_id: this.counterfoil.voucher_type_id
      });
    }
  }

  map() {
    if (this.counterfoil === null) {
      this.counterfoil = new Counterfoil();
      this.counterfoil.id = 0;
      this.counterfoil.status_id = 1
      //this.item.created_date = moment(new Date()).toDate();
    }
    this.counterfoil.code = this.CMXFormGroup.get("code").value;
    //this.item.alternative_code = this.CMXFormGroup.get("alternative_code").value;
    this.counterfoil.name = this.CMXFormGroup.get("name").value;
    this.counterfoil.voucher_type_id = this.CMXFormGroup.get("voucher_type_id").value;

    this.counterfoil.company_id = this.company.id;
    this.counterfoil.from_number = this.CMXFormGroup.get("from_number").value;
    this.counterfoil.to_number = this.CMXFormGroup.get("to_number").value;
    this.counterfoil.next_number = this.CMXFormGroup.get("next_number").value;

    //this.item.modified_date = moment(new Date()).toDate();
    this.counterfoil.userId = this.currentUser.id;

  }

  onSave() {
    this.map();
    this._counterfoilService.register(this.counterfoil).subscribe((result: Counterfoil) => {
      if(this.counterfoils)
      {
      let counterfoils = this.counterfoils;
      const index = counterfoils.findIndex(n => n.id === result.id);
      if (index !== -1) {
        counterfoils[index] = result;
      }else{
        counterfoils.push(result);
      }
      try {
        this.counterfoils = counterfoils;
        sessionStorage.setItem('FAC-ITEMS', JSON.stringify(counterfoils));
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
