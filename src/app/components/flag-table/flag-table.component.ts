import { Component, Input, OnInit } from "@angular/core";
import { ViewCell } from "ng2-smart-table";

@Component({
    template: `
    <div class='row'>
      <div class='col-12 text-center mt-2'>
        <div class='rounded-circle d-inline-block' style='width:20px; height:20px;' [ngClass]="{
                                                                                'bg-danger': this.value.status_id == 2, 
                                                                                'bg-success':this.value.status_id == 1
                                                                                }"></div>                                                                       
      </div>
    </div>
    <div class="row" >
      <div class="col text-center">
        <span [ngClass]="{
          'text-danger': this.value.status_id == 2,  
          'text-success':this.value.status_id == 1
          }">{{ this.value.status_id == 1 ? 'Activo' : 'Inactivo'}}</span>                                                                        
      </div>
    </div>
    `
  })
  export class FlagTableComponent implements OnInit, ViewCell {
    
    imgUrl: string = null;
    
    @Input() value: string | number | any;
    @Input() rowData: any;
    
    ngOnInit(){ }
  }