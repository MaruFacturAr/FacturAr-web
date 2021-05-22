import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
    template: `
    <div class="row">
      <div class="col">{{nombre}}</div>
    </div>
    <div class="row">
      <div class="col">
        <span class="text-secondary-cmx font-xs">{{cuit | cuit}}</span>
      </div>
    </div>`,
  })
  export class TableClienteComponent implements OnInit, ViewCell {
    
    cuit: string;
    nombre: string;
    
    @Input() value: string | number | any;
    @Input() rowData: any;
    
    ngOnInit(){
      this.nombre = this.value.nombre;
      this.cuit = this.value.cuit;
    }    
  }