import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxAsideComponent } from 'app/components/advanced/aside/aside.component';
import { CMXAnimations } from 'app/_helpers/animations';
import { Item } from 'app/_models/item.model';
import { UsuarioService } from 'app/_services/usuario.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DndDropEvent } from 'ngx-drag-drop';

@Component({
  selector: 'app-drag-drop-item',
  templateUrl: './drag-drop-item.component.html',
  styleUrls: ['./drag-drop-item.component.scss'],
  animations: [CMXAnimations]
})
export class DragDropItemComponent implements OnInit, OnChanges {

  ngOnChanges(changes:SimpleChanges) {
    
    if(changes.itemsLeft && !changes.itemsLeft.isFirstChange()){
      this.itemLeftFiltered = changes.itemsLeft.currentValue.filter((itemL) => 
      { return !this.itemRightFiltered.find((itemR) => { return itemR.id == itemL.id }) })
    }
  }

  
  //data
  @Input() itemsLeft:Array<Item> = [];   
  @Input() itemsRight:Array<Item> = [];
  //errormsg
  @Input() isLoading:Boolean = false;

  @Input() currentUser:any;

  @Output() onRightItemsChanged = new EventEmitter();

  
  itemLeftFiltered:Array<Item> = [];
  itemRightFiltered:Array<Item> = [];



  constructor( private _bsModalRef: BsModalRef,
    private _notificationService: NotifierService,
    private _translateService:TranslateService, private usuarioService:UsuarioService) {}

  ngOnInit(): void {
    Object.assign(this.itemLeftFiltered, this.itemsLeft);
    Object.assign(this.itemRightFiltered, this.itemsRight);

    if(!this.itemsLeft)
      this.itemsLeft = new Array<Item>();

    if(!this.itemsRight)
      this.itemsRight = new Array<Item>();

  }

 // @Output() close = new EventEmitter<boolean>();


  doFilter(side:string, value:string){
    const txt = value.toLocaleLowerCase();
    
    if(side == "left"){
      this.itemLeftFiltered = this.itemsLeft.filter((item) => {
        
        return (this.itemRightFiltered.map((iRF) => { return iRF.code }).indexOf(item.code) == -1 &&
                (
                  (item.code.toLowerCase().indexOf(txt) >= 0) 
                )
              );
        })

    } else {
      this.itemRightFiltered = this.itemsRight.filter((item) => {        
        return (item.code.toLowerCase().indexOf(txt) >= 0);
      });
    }
  }

  onAdd(item:any){

    let result:boolean = true;
    let message: string;
    item.quantity = 1;
    item.total = item.price;
   
    
    this.itemRightFiltered.filter(seleccionados => {
      
      if(seleccionados.code.indexOf(item.code) != -1 ){
        result = false;
        message = "Producto o servicio ya ingresado";
      }

    });
  
    if(result){
      this.itemRightFiltered.push(item);
      this.itemRightFiltered.reverse();
      this.removeItem(item, this.itemLeftFiltered);
      this.onRightItemsChanged.emit(this.itemRightFiltered);
    }
    else
      this._notificationService.notify('error',message);
  } 

  onRemove(item:any){
    this.itemLeftFiltered.push(item);
    this.removeItem(item, this.itemRightFiltered);

    this.onRightItemsChanged.emit(this.itemRightFiltered);
  }

  onDataChange(data:any){
    this.onRightItemsChanged.emit(this.itemRightFiltered);
  }

  onitemsRightDrop(e:DndDropEvent) {
    this.onAdd(e.data)
  }

  removeItem(item: any, list: Array<any>) {
    let index = list.map(function (e) {
      return e.id
    }).indexOf(item.id);
    list.splice(index, 1);
  }

  onSave(){
    this._bsModalRef.hide();
  }

}