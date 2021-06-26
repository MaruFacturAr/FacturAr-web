import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-invoice-action',
  templateUrl: './invoice-action.component.html',
  styleUrls: ['./invoice-action.component.scss']
})
export class InvoiceActionComponent implements OnInit {

    constructor() { }
  
    @Input() value: string | number;
    @Input() rowData: any;
  
    @Output() viewFactura: EventEmitter<any> = new EventEmitter();
  
    onViewFactura() {
  
      this.viewFactura.emit(this.rowData);
    }
  
    ngOnInit(){ }
  
  }
