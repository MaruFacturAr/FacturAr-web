import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceActionComponent } from './invoice-action.component';



@NgModule({
  declarations: [InvoiceActionComponent],
  imports: [
    CommonModule
  ],
  exports: [ InvoiceActionComponent ],
  entryComponents: [ InvoiceActionComponent ]
})
export class InvoiceActionModule { }
