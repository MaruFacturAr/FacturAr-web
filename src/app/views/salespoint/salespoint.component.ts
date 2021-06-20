import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { Company } from 'app/_models/company.model';
import { SalesPoint } from 'app/_models/sales.point.model';
import { AuthenticationService } from 'app/_services/authentication.service';
import { CompanyService } from 'app/_services/company.service';
import { ExcelService } from 'app/_services/excel.service';
import { SalesPointService } from 'app/_services/sales.point.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SessionStorageService } from 'ngx-webstorage';
import { BaseViewComponent } from '../base.view.component';

@Component({
  selector: 'app-salespoint',
  templateUrl: './salespoint.component.html',
  styleUrls: ['./salespoint.component.scss']
})
export class SalespointComponent extends BaseViewComponent implements OnInit {
 
  company: Company;
  salesPoint:SalesPoint;
  salesPoints:SalesPoint[];;

  CMXFormGroup = new FormGroup({

    afip_code: new FormControl(0, [Validators.required, Validators.pattern(new RegExp(/^\d+$/))]),
    name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]),
  });

  constructor(private _salesPointService: SalesPointService,
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
    this.salesPoints = JSON.parse(sessionStorage.getItem('FAC-SALESPOINTS'));
    this.salesPoint = JSON.parse(sessionStorage.getItem("FAC-SALESPOINT"));



   }

  ngOnInit(): void {
    if(this.salesPoint){
      this.translateSalesPointToForm();
    }
  }

  translateSalesPointToForm() {
    if (this.salesPoint) {
      this.CMXFormGroup.patchValue({
        afip_code: this.salesPoint.afip_code,
        name: this.salesPoint.name,
      });
    }
  }

  map() {
    if (this.salesPoint === null) {
      this.salesPoint = new SalesPoint();
      this.salesPoint.id = 0;
      this.salesPoint.status_id = 1
      //this.item.created_date = moment(new Date()).toDate();
    }
    this.salesPoint.afip_code = this.CMXFormGroup.get("afip_code").value;
    this.salesPoint.name = this.CMXFormGroup.get("name").value;
    this.salesPoint.company_id = this.company.id;
    this.salesPoint.userId = this.currentUser.id;

  }

  onSave() {
    this.map();
    this._salesPointService.register(this.salesPoint).subscribe((result: SalesPoint) => {
      if(this.salesPoints)
      {
      let salesPoints = this.salesPoints;
      const index = salesPoints.findIndex(n => n.id === result.id);
      if (index !== -1) {
        salesPoints[index] = result;
      }else{
        salesPoints.push(result);
      }
      try {
        this.salesPoints = salesPoints;
        sessionStorage.setItem('FAC-SALESPOINTS', JSON.stringify(salesPoints));
      } catch (error) {
          console.warn("Session Storage - Storage OverQuoted");
          sessionStorage.removeItem("FAC-SALESPOINTS");
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
