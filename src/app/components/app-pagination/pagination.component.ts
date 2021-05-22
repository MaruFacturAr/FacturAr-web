import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CMXConfig } from 'config/config';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class AppPagination implements OnChanges, OnInit {
    
    @Input() page:number;
    @Input() data:any;
    @Input() totalRecords:number;

    @Input() showPageText:boolean;
    @Input() recordsText:string;
    @Input() type:string;

    @Output() onGoToPage = new EventEmitter<any>();
    
    public currentPage:number;
    public fromTo:string;

    public isPrevLoading:boolean;
    public isNextLoading:boolean;
    public itemsPerPage:number;

    public constructor () {
      
    }

    ngOnInit(): void {
      this.showPageText = (this.showPageText == undefined) ? true : this.showPageText;
      this.recordsText = (this.recordsText == undefined) ? "registros" : this.recordsText;
      this.itemsPerPage = (this.type == "pdf") ? 1 : CMXConfig.general.itemsPerPage;
    }

    ngOnChanges(changes: SimpleChanges){

      
      if(changes.page){

        this.currentPage = changes.page.currentValue;

        if(this.type == "pdf"){
          this.calculateItems();  
          this.isPrevLoading = false;
          this.isNextLoading = false;
        }

      }

      if(changes.data){
        this.calculateItems();
        this.isPrevLoading = false;
        this.isNextLoading = false;
      }

    }

    doNextPage() {
      this.isNextLoading = true;

      this.currentPage++;
      this.onGoToPage.emit({goToPage: this.currentPage});
    }

    doPrevPage() {
      this.isPrevLoading = true;

      this.currentPage--;
      this.onGoToPage.emit({goToPage: this.currentPage});
    }

    calculateItems():void{
      
      if(this.itemsPerPage > 1){

        let from:number = (this.itemsPerPage * this.currentPage) - (this.itemsPerPage-1);
        let to:number;
  
        if((this.itemsPerPage * this.currentPage) < this.totalRecords){
          to = this.itemsPerPage * this.currentPage
        } else {
          to = this.totalRecords;
        }

        this.fromTo = from + '-' + to + " de";

      } else {

        this.fromTo = "Página " + this.currentPage + " de ";

      }
    }
}