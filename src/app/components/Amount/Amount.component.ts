import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
    template: `
    <div class="text-right">
      <ng-container *ngIf="value; else noValue">{{value | number:'1.0-2':'es-AR'}}</ng-container>
      <ng-template #noValue>0</ng-template>
    </div>`,
  })
  export class AmountComponent implements OnInit, ViewCell {
    
    renderValue: string;
    
    @Input() value: string | number;
    @Input() rowData: any;
    
    ngOnInit(){

    }    
  }