import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { CMXAnimations } from 'app/_helpers/animations';
import { Company } from 'app/_models/company.model';
import { Counterfoil } from 'app/_models/counterfoil.model';
import { Customer } from 'app/_models/customer.model';
import { InvoiceItem } from 'app/_models/invoice.item.model';
import { Invoice } from 'app/_models/invoice.model';
import { Item } from 'app/_models/item.model';
import { ItemTemp } from 'app/_models/item.temp.model';
import { SalesPoint } from 'app/_models/sales.point.model';
import { Voucher } from 'app/_models/voucher.model';
import { AuthenticationService } from 'app/_services/authentication.service';
import { CompanyService } from 'app/_services/company.service';
import { CounterfoilService } from 'app/_services/counterfoil.service';
import { CustomerService } from 'app/_services/customer.service';
import { ExcelService } from 'app/_services/excel.service';
import { InvoiceService } from 'app/_services/invoice.service';
import { ItemService } from 'app/_services/item.service';
import { SalesPointService } from 'app/_services/sales.point.service';
import { VoucherService } from 'app/_services/voucher.service';
import { sub } from 'date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SessionStorageService } from 'ngx-webstorage';
import { BaseViewComponent } from '../base.view.component';
import { DragDropItemComponent } from './drag-drop-item/drag-drop-item.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  animations: [ CMXAnimations ]
})
export class InvoiceComponent extends BaseViewComponent implements OnInit {

  public items:any;
  public busqueda:any;

  isService:Boolean=false;
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
    private _itemService: ItemService,
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
    this.items = JSON.parse(sessionStorage.getItem('FAC-ITEMS-AGREGADAS'));
    this.busqueda = JSON.parse(sessionStorage.getItem('FAC-ITEMS-BUSQUEDA'));
 
    
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

    this.isLoading = true;
     this._itemService.getAll().subscribe((result) =>{
      this.isLoading = false;
      debugger;
     
      if(result) {
        
        try {
          this.busqueda = result;
          sessionStorage.setItem('FAC-ITEMS-BUSQUEDA', JSON.stringify(result));

        } catch (e) {
          console.warn("Session Storage - Storage OverQuoted");
          sessionStorage.removeItem('FAC-ITEMS-BUSQUEDA');
        }
      }
    });
  }

  ngOnInit() {

    
   
  }

 
  map():Invoice{
    let invoice = new Invoice();
    invoice.company_id = this.company.id;
    invoice.amount_net = this.CMXFormGroup.get("amount_net").value;
    invoice.amount_op_ex = 0;
    invoice.counterfoils_id = this.CMXFormGroup.get("counterfoil_id").value;
    invoice.created_date = new Date();
    invoice.currency_id = this.CMXFormGroup.get("currencyId").value;
    invoice.customer_id = this.CMXFormGroup.get("customer_id").value;
    invoice.emision_date = this.CMXFormGroup.get("emision_date").value;
    invoice.expiration_date = this.CMXFormGroup.get("expiration_date").value[0];
    invoice.invoice_status_type_id = 1;
    invoice.number = this.CMXFormGroup.get("number").value;
    invoice.observations = "";
    invoice.letter = "C";
    invoice.sale_condition_id = this.CMXFormGroup.get("sale_condition_id").value;
    invoice.sale_point_id = this.CMXFormGroup.get("sale_point_id").value;
    invoice.service_date_from = this.CMXFormGroup.get("service_date").value[0];
    invoice.service_date_to = this.CMXFormGroup.get("service_date").value[1];
    invoice.total_amount = this.CMXFormGroup.get("total_amount").value;
    invoice.total_amount_conc = this.CMXFormGroup.get("total_amount").value;
    invoice.total_ivas = this.CMXFormGroup.get("total_ivas").value;
    invoice.total_taxes = this.CMXFormGroup.get("total_taxes").value;
    invoice.userId = this.currentUser.id;
    invoice.voucher_id = this.CMXFormGroup.get("voucher_id").value;
    invoice.total_records = 1;
    invoice.invoiceItemList = new Array<InvoiceItem>();
    invoice.cae = "";
    invoice.cae_expiration_date = new Date();
    invoice.id = 0;


    this.items.forEach((element:ItemTemp) => {
      let it = new InvoiceItem();
      it.invoice_id = 0;
      it.amount_item = element.price;
      it.amount_ivas = 0;
      it.amount_op_ex = 0;
      it.amount_taxes = 0;
      it.quantity = element.quantity;
      it.item_id = element.id;
      it.id = 0;
      
      invoice.invoiceItemList.push(it);
      
    });
    

    return invoice;
   

  }
  

  onSave(){
    
    this._invoiceService.register(this.map()).subscribe((result:any)=>{
     
        this.CMXFormGroup.reset();
        this._notificationService.notify('success', "Se grabó correctamente");
        this._router.navigate(['/invoice/detalle/' + result.id])
      }, error => {
        this._notificationService.notify('error', error);
      });

  }

  changeDays(days:number, control:string){
    const from:Date = sub(new Date(), {days: days});
    const to:Date = new Date();

    this.CMXFormGroup.get(control).setValue([from, to]);
}


onClickAddItems() {
  let modalConfig:any = {
    initialState: {
    itemsLeft: this.busqueda,
    itemsRight: this.items,
    isLoading: this.isLoading,
    currentUser: this.currentUser
    },
    class:'modal-lg'
  };
  this.bsModalRef = this._modalService.show(DragDropItemComponent, modalConfig);
  this.bsModalRef.content.onRightItemsChanged.subscribe((value) => {

   this.onItemsChange(value);
    console.log(value) // here value passed on clicking ok will be printed in console. Here true will be printed if OK is clicked
    //return value;
 }, (err) => {
    // return false;
});
 }

onItemsChange(items:Array<ItemTemp>){
  this.items = items;
  sessionStorage.setItem('FAC-ITEMS-AGREGADAS', JSON.stringify(items));
  this.setTotals()
}

onChangeQuantity(event, item:ItemTemp){
  item.total = event.target.value * item.price;
  this.setTotals();
}

onChangeVoucher(event){
  debugger;

  let result = this.CMXFormGroup.get("voucher_id").value;
    console.log(result);
  let voucher = this.vouchers.find( x => x.id == result);
  this.CMXFormGroup.get("sale_point_id").setValue(voucher.sales_point_id);
  this.CMXFormGroup.get("counterfoil_id").setValue(voucher.counterfoil_id);

  let counterfoil = this.counterfoils.find( x => x.id == voucher.counterfoil_id);
  this.CMXFormGroup.get("number").setValue(counterfoil.next_number);
  

}

onChangeCounterfoil(event){

  let result =   this.CMXFormGroup.get("counterfoil_id").value;
 
  let counterfoil = this.counterfoils.find( x => x.id == result);
  this.CMXFormGroup.get("number").setValue(counterfoil.next_number);

}

onChangeItemType(event){
  let result = this.CMXFormGroup.get("item_type").value;
  this.isService = (result === 2 || result == 3);
}

onChangeSaleCondition(event){
  let result =   this.CMXFormGroup.get("sale_condition_id").value;
 
  let salesCondition = this.salesCondition.find( x => x.id == result);

  this.changeDays(salesCondition.days, 'expiration_date');
  
}

onRemove(item:any){
    
  this.removeItem(item, this.items);
  this.setTotals();
}

removeItem(item: any, list: Array<any>) {
  let index = list.map(function (e) {
    return e.id
  }).indexOf(item.id);
  list.splice(index, 1);
}

setTotals():void{
  let importeTotal:number=0;
  this.items.forEach(element => {
   importeTotal += element.price * element.quantity;
    
  });
  this.CMXFormGroup.get("amount_net").setValue(importeTotal);
  this.CMXFormGroup.get("total_ivas").setValue(0);
  this.CMXFormGroup.get("total_taxes").setValue(0);
  this.CMXFormGroup.get("total_amount").setValue(importeTotal);
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
