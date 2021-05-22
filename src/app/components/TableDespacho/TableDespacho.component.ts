import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
    template: `
    <div class="row">
      <div class="col">{{value}}</div>
    </div>
    <div class="row">
      <div class="col">
        <span class="text-secondary-cmx font-xs">{{tipoDocumento}}</span>
        <span class="text-secondary-cmx font-xs" *ngIf="sigea"> - Sigea: {{sigea}}</span>
      </div>
    </div>`,
  })
  export class TableDespachoComponent implements OnInit, ViewCell {
    
    tipoDocumento: string;
    sigea:string;

    @Input() value: string | number;
    @Input() rowData: any;
    
    ngOnInit(){
      
      if(this.rowData.tipoDocumento != undefined){
        this.tipoDocumento = this.rowData.tipoDocumento;
      }

      if(this.rowData.sigea != undefined && this.rowData.sigea != ""){
        this.sigea = this.rowData.sigea;
      }
      
    }    
  }