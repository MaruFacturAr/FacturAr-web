import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { ViewCell } from 'ng2-smart-table';

@Component({
    template: `{{renderValue}}`,
  })
  export class TableDateComponent implements OnInit, ViewCell {
    
    renderValue: string;
    
    @Input() value: string | number;
    @Input() rowData: any;
    
    ngOnInit(){
      if(this.value){
        let fecha = moment(this.value.toString());
        this.renderValue = fecha.format("DD/MM/YYYY");
      }
    }    
  }