import { ExcelService } from '../_services/excel.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {  BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { LocalDataSource } from 'ng2-smart-table'
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'app/_services/authentication.service';
import { CMXConfig } from 'config/config';
import { Router } from '@angular/router';
import * as Enumerable from "linq-es2015";
import { SessionStorageService } from 'ngx-webstorage';
import { NotifierService } from 'angular-notifier';


export abstract class BaseViewComponent {
   
    public dataSource: Array<any>;

    public showResult = false;
    public showFormSearch = false;
    public showRangeDaysAlert = false;
    public isLoading = false;

    // Paginado
    public page = 1;
    public paginatorText:string;

    //Grillas
    public settings:any;
    public source:LocalDataSource;

    public totalRows: number;
    public isFirstSearch: Boolean = true;
    public disableFormControls:boolean = false;

    // Excel
    protected exportToExcelDisabled = false;
    
    //Calendars
    bsConfig: Partial<BsDatepickerConfig>;
    minDate:Date = moment(new Date()).subtract(3, 'months').toDate();
    maxDate:Date = new Date();
    selectedDate:Array<Date> = [];
    public maxDaysInDatepicker = CMXConfig.general.maxDaysInDatepicker;

    //Filtros Aplicados
    public filterItems:Array<any> = [];

    public currentUser:any;

    public bsModalRef: BsModalRef;
    
    constructor(protected _notificationService: NotifierService, 
                protected _excelService: ExcelService,
                protected _authenticationService: AuthenticationService,
                protected _translateService:TranslateService,
                protected _router: Router,
                protected _sessionStorage:SessionStorageService) 
    {
        this.currentUser = this._authenticationService.getDecodedAccessToken();

        this.currentUser.isAdmin = (this.currentUser.rol == 'A' || this.currentUser.rol == 'S' || this.currentUser.rol == 'O');
        this.currentUser.isIMEX = (this.currentUser.rol == 'C');
        this.currentUser.isDespachante = (this.currentUser.rol == 'D');
        this.currentUser.isDespachanteImex =  (this.currentUser.rol == 'R' || this.currentUser.rol == 'V');

        this._translateService.setDefaultLang('es');
        this._translateService.use('es');        

        this.source = new LocalDataSource();

        this.source.onChanged().subscribe(e => {

            this.source.getFilteredAndSorted().then(data => {

                Object.keys(sessionStorage).forEach(key => {

                    if(key.endsWith('filtros')) {
                        const keyName = key.replace('ngx-webstorage|', '');
                        let filtros = this._sessionStorage.retrieve(keyName);

                        switch(e.action){

                        case 'page':
                            filtros.pagina = e.paging.page
                            break;
                        case 'filter':
                            filtros.tableFilters = e.filter.filters;
                            break;
                        }

                        this._sessionStorage.store(keyName, filtros);
                    }
                })

                this.calculatePaginatorText(e.paging.page, data.length);
                this.setPaginationPosition();
            })
        })

        //ngx-Calendar
        this.bsConfig = Object.assign({}, {
            containerClass: 'theme-default',
            showWeekNumbers: false,
            dateInputFormat: 'YYYY-MM-DD',
            rangeInputFormat: 'YYYY-MM-DD',
            locale:'es-ar',
            rangeSeparator: ' al '
        });

        this.selectedDate.push(moment(new Date()).subtract(3, 'months').toDate());
        this.selectedDate.push(new Date());

        //Ng2-SmartTable
        this.settings = {
            columns: this.getDataColumns(),
            pager: { 
                display:true,
                perPage: CMXConfig.general.itemsPerPage
            },
            actions:{
                add:false,
                edit:false,
                delete:false
            },
            attr:{
                class:'table-striped table-bordered table-responsive-md'
            },
            noDataMessage: '',
            rowClassFunction: (row) => {
                
                Object.keys(row._dataSet.columnSettings).forEach((key, indexRow) => {
                    
                    if(row._dataSet.columnSettings[key].hasOwnProperty("class")){

                        $("ng2-smart-table table thead tr").each(function(index, tr){
                            $("th", tr).eq(indexRow).addClass(row._dataSet.columnSettings[key].class);
                        })

                        $("ng2-smart-table table tbody tr").each(function(index, tr){
                            $("td", tr).eq(indexRow).addClass(row._dataSet.columnSettings[key].class);
                        })
                    }
                })
            }
        }
    }

    public calculatePaginatorText(currentPage:number, totalRecords:number) {
      
        let from:number = (CMXConfig.general.itemsPerPage * currentPage) - (CMXConfig.general.itemsPerPage - 1);
        let to:number;
    
        if((CMXConfig.general.itemsPerPage * currentPage) < totalRecords){
        to = CMXConfig.general.itemsPerPage * currentPage
        } else {
        to = totalRecords;
        }

        this.paginatorText = (totalRecords > 0) ? from + '-' + to + " de " + totalRecords : "";
    }

    /**
    * Actualiza las clases del paginador del ng2-smart-table y lo posiciona.
    */
    public setPaginationPosition(){
        setTimeout(() => {
            $(".ng2-smart-pagination-nav").addClass("nav justify-content-center");
            $(".ng2-smart-pagination.pagination").addClass("mb-0");
            $(".ng2-smart-page-link.page-link.page-link-prev").empty().append($("<i></i>").addClass("fas fa-angle-left"));
            $(".ng2-smart-page-link.page-link.page-link-next").empty().append($("<i></i>").addClass("fas fa-angle-right"));
            $("ng2-smart-table-pager").appendTo($(".cmx-pagination .btn-group"));
        }, 1);
    }

    /**
    * Oculta los botones que contienen los números de página del paginador del ng2-smart-table.
    */
    // public hidePaginationButtons(){
    //     setTimeout(() => {
    //         $(".ng2-smart-pagination li").first().next().addClass("cmx-pagination-control");
    //         $(".ng2-smart-pagination li").last().prev().addClass("cmx-pagination-control");
    //         $(".ng2-smart-pagination li").not(".cmx-pagination-control").addClass("d-none");
    //     },1);
    // }

    protected getString(key:string, params?:object){
        let result:string;

        this._translateService.get(key, params).subscribe((value) => { 
            result = value 
        });

        return result;
    }
    
    public showPreviousResults(){
        this.showResult = true;
        this.showFormSearch = false;
    }

    public getRoleForInitialSearch(){
        let hasRole:Boolean = false;

        CMXConfig.general.initialSearch.role.forEach(role => {            
            if(role == this.currentUser.rol)
               hasRole = true;
        });

        return hasRole;
    }

    protected exportToExcel(event) {
        
        this.exportToExcelDisabled = true;
        this._notificationService.notify('default', 'Puede continuar trabajando mientras se procesa su reporte.');
        
        this.observableForExcelReport().subscribe((result: any) => {
              
            let json:any;

            if(result.hasOwnProperty('data')){
                json = result.data;
            }else{
                json = result;
            }

            this.excelReportOk(json);
            this.exportToExcelDisabled = false;

          }, error => {

            this.excelReportError(error);
            this.exportToExcelDisabled = false;

          }
        );        
    }

    protected abstract observableForExcelReport();
    protected abstract getExcelDataColumns();
    protected abstract getExcelReportName();
    protected abstract getExcludedExcelDataColumns();
    protected abstract pageChanged(data:any);
    protected abstract getDataColumns();

    protected excelReportOk(data: Array<any>) {

        data.forEach((item, index) => {

            Object.keys(item).forEach(key => {

                let value = item[key];
                
                // if(value instanceof AduanaModel){
                //     const aduana = (<AduanaModel>value);
                //     item[key] = aduana.codigo + ' - ' + aduana.aduana;
                // }

                // if(value instanceof SubRegimenModel){
                //     item[key] = (<SubRegimenModel>value).codigo;
                // }

                // if(value instanceof DeclaracionEstadoModel){
                //     item[key] = (<DeclaracionEstadoModel>value).descripcion;
                // }

                if(value == false || value == true){
                    item[key] = (value) ? "Si" : "No";
                }

                if(value instanceof Array){
                    let str:String = "";

                    value.forEach((item:any) => {
                        
                        if(typeof item == "string"){
                            if(str == ""){
                                str = item;
                            } else {
                                str += ", " + item;
                            }
                        }

                    })

                    item[key] = str;
                }
                
                //Si es una fecha válida, se intenta parsear
                if(value != undefined && value.length == 19 && moment(value, "YYYY-MM-DDThh:mm:ss").isValid()){
                    
                    const dateHour = moment(value);

                    if(dateHour.hour() == 0 && dateHour.minute() == 0 && dateHour.second() == 0)
                    {
                        item[key] = moment(value).format("DD/MM/YYYY");
                    } else {
                        item[key] = moment(value).format("DD/MM/YYYY hh:mm");
                    }
                }
            });

        })

        this._excelService.exportAsExcelFile(data, this.getExcelDataColumns(), this.getExcludedExcelDataColumns(), this.getExcelReportName());
    }

    protected excelReportError(error: any) {
        this._notificationService.notify('error', 'Ocurrió un error al obtener el reporte');
    }

    protected collapseSidebar(){        
        document.querySelector('body').classList.remove('brand-minimized');
        document.querySelector('body').classList.remove('sidebar-minimized');
        document.querySelector('body').classList.add('brand-minimized');
        document.querySelector('body').classList.add('sidebar-minimized');
    }

    createFormFiltersTags(form:FormGroup){
        setTimeout(() => {
            
            this.filterItems = [];
            debugger;
            let values = form.value;
            if(values === null || values === undefined)
             return;
            Object.keys(values).forEach(key => {
                
                let filterName = key.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1").trim();//Camel Case
    
                const element = $('[name="' + key + '"]');
    
                if(element.length >= 1 && element.prop("tagName").toLowerCase() == 'select' ){
                    const options = $('option', element);
                    const value = values[key];
                    const text = $(Enumerable.from(options).First(o => { return (<HTMLInputElement>o).value.endsWith(value)})).text();
                    
                    this.filterItems.push({
                        Name: filterName,
                        Value: text
                    })
                }
    
                if(values[key] != "" && values[key] != -1 && !this.filterItems.some(f => f.Name == filterName)){
    
                    if(values[key] instanceof Array) {
                        if(values[key][0] instanceof Date && values[key][1] instanceof Date){
                            this.filterItems.push({
                                Name: filterName, 
                                Value:moment(values[key][0]).format('DD/MM/YYYY') + " al " +  moment(values[key][1]).format('DD/MM/YYYY')}); //Fecha
                        }
                    } else if(values[key] instanceof Object){
                        this.filterItems.push({
                            Name: filterName, 
                            Value:values[key].descripcion}); //Descripcion
                    } else {
                        this.filterItems.push({
                            Name: filterName, 
                            Value:values[key]}); //Number
                    }
                }
    
            })

        }, 1000);


        
    }

    resetForm(){
        this.showResult = false;
        this.isFirstSearch = false;
        this.showFormSearch = true;
        this.filterItems = [];
    }

    lastClickTime: number = 0;
    onRowSelect(event, route, id){
    if (this.lastClickTime === 0) {
        this.lastClickTime = new Date().getTime();
    } else {
        const change = (new Date().getTime()) - this.lastClickTime;
        if (change < 600) {
            this._router.navigate([route + id, {i: event.data.id}]);
        }
        this.lastClickTime = 0;
    }
  }
}
