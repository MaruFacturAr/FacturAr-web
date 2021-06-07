import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { CMXAnimations } from "app/_helpers/animations";
import { ViewCell } from "ng2-smart-table";

@Component({
    animations: [CMXAnimations],
    template: `
    <div class='dropdown dropup text-center' dropdown container='body'>
      <button id='{{rowData.id}}' class='btn btn-light' dropdownToggle role='button' aria-controls='dropdown-basic'>
      <i class="fas fa-ellipsis-v"></i>
      </button>
    
      <div *dropdownMenu class='dropdown-menu shadow-sm' role='menu' [@showHideInfo]>
          <a href='javascript:void(0);' (click)='onEliminar()' class='dropdown-item' *ngIf='showEliminar'>
          <i class="fas fa-trash-alt text-primary"></i>  Eliminar
          </a>
          <a href='javascript:void(0);' (click)='onModificar()' class='dropdown-item' *ngIf='showModificar'>
          <i class="far fa-edit text-primary"></i> Editar
          </a>
          <a href='javascript:void(0);' (click)='onActivar()' class='dropdown-item' *ngIf='showView'>
          <i class="far fa-check-circle text-primary"></i> Activar
          </a>
          <a href='javascript:void(0);' (click)='onDesactivar()' class='dropdown-item' *ngIf='showView'>
          <i class="far fa-times-circle text-primary"></i> Desactivar
          </a>
      </div>
    </div>
    `
  })
  export class ActionsTableComponent implements OnInit, ViewCell {
    
    constructor(private router:Router){ }
  
    showEliminar:boolean;
    showModificar:boolean;
    showActivar:boolean;
    showDesactivar:boolean;
  
    // faEllipsisV = faEllipsisV;
    // faTrash = faTrash;
    // faEdit = faEdit;
    // faArchive = faArchive;
    // faDownload = faDownload;
  
    @Input() value: string | number;
    @Input() rowData: any;
  
    @Output() eliminar: EventEmitter<any> = new EventEmitter();
    @Output() modificar: EventEmitter<any> = new EventEmitter();
    @Output() activar: EventEmitter<any> = new EventEmitter();
    @Output() desactivar: EventEmitter<any> = new EventEmitter();
    
    ngOnInit(){      
      this.showEliminar = true;
      this.showModificar = true;
      this.showActivar = this.rowData.status_id === 2;
      this.showDesactivar = this.rowData.status_id === 1;
    }
  
    onEliminar(){
      this.eliminar.emit(this.rowData);
    }
  
    onModificar(){
      this.modificar.emit(this.rowData);
    }
  
    onActivar(){
      this.activar.emit(this.rowData);
    }
    
    onDesactivar(){
        this.desactivar.emit(this.rowData);
      }
  
  }