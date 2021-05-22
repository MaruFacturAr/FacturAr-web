import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WindowRefService } from '../../../_services/windowRef.service';
import { CMXAnimations } from 'app/_helpers/animations';
import { BsModalRef } from 'ngx-bootstrap';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './app-pdf-viewer.component.html',
  styleUrls: ['./app-pdf-viewer.component.scss'],
  animations: [CMXAnimations]
})

export class AppPdfViewerComponent {

  rowData: any;
  @Input() pdfObj:any;
  @Input() filename:string;

  @Output() loadFamilia = new EventEmitter<any>();
  
  currentPDFPage:number;
  currentPaginatorPage:number;

  selectedFamilia:any;

  public totalPages: number;
  public documentLoaded: Boolean;
  public rotation: number;
  public zoom: number;
  public pdf: any;
  public outline: any[];
  public outlineResult: any[];
  public docTitle: string;
  public isFirstLoad:boolean = true;

  errorObj = {
    message: "",
    showError:false
  }

  public errorMsg: string;

  constructor(private winRefService: WindowRefService) {
    
    this.currentPDFPage = this.currentPaginatorPage = 1;
    this.documentLoaded = false;
    this.rotation = 0;
    this.zoom = 1;
  }

  /* EVENTOS */

  afterLoadComplete(pdf: any) {
    
    this.documentLoaded = true;
    this.totalPages = pdf._pdfInfo.numPages;
    this.pdf = pdf;

    if(this.isFirstLoad){
      this.loadOutline();
      this.isFirstLoad = false;
    }

    setTimeout(() => {
      this.currentPaginatorPage = 1;
      this.currentPDFPage = 1;
    }, 500);
    
  }

  onError(error: any) {
    this.errorObj.showError = true;
    this.errorObj.message = 'No existe el documento solicitado.';
  }

  /* CARGA DE OUTLINE */

  loadOutline() {

    this.pdf.getOutline().then((outline: any[]) => {
      
      if(outline) {
        this.outline = outline.map((e, index) => {
          
          let paginaEnPDF = index+1;
  
          return {
            familia: e.title.split("Familia: ")[1],
            pagina: e.title.split("Página: ")[1].split(",")[0],
            paginaEnPDF: paginaEnPDF
          };
  
        });
      } 
    });
    
    setTimeout(() => {
      if (this.outline) {
        this.processOutline();
        this.loadDocTitle();
      } else {
        this.loadFamiliaPages(null);
      }
    }, 1000);

  }

  loadFamiliaPages(element: any) {

    let paginas = null;

    if(element != null && element.familia != 0){

      this.selectedFamilia = element;
      paginas = this.outline.filter(e => { return e.familia == this.selectedFamilia.familia }).map(p => { return p.paginaEnPDF}).join(",");

    } else {

      this.selectedFamilia = null;
      this.totalPages = (this.outline) ? this.outline.length : this.totalPages;
      this.currentPaginatorPage = 1;
      this.currentPDFPage = (this.outline) ? this.outline[0].paginaEnPDF : 1;
      this.docTitle = "";
    }

    this.loadFamilia.emit({paginas: paginas });
    this.loadDocTitle();
    
  }

  pageChanged(event: any): void {
    this.currentPaginatorPage = event.goToPage;
    this.currentPDFPage = event.goToPage;
  }

  processOutline() {

    this.outlineResult = new Array();

    this.outlineResult.push({title: 'Todo el Documento', familia: 0});

    if(this.outline.some(o => { return o.familia == 1 })){
      this.outlineResult.push({title: 'Declaración y sobre contenedor - (Familia 1)', familia: 1});
    }

    if(this.outline.some(o => { return o.familia == 2 })){
      this.outlineResult.push({title: 'Factura Comercial - (Familia 2)', familia: 2});
    }

    if(this.outline.some(o => { return o.familia == 3 })){
      this.outlineResult.push({title: 'Conocimiento de embarque - (Familia 3)', familia: 3});
    }

    if(this.outline.some(o => { return o.familia == 4 })){
      this.outlineResult.push({title: 'Certificados de Origen - (Familia 4)', familia: 4});
    }

    if(this.outline.some(o => { return o.familia == 5 })){
      this.outlineResult.push({title: 'Otros - (Familia 5)', familia: 5});
    }

    this.loadFamiliaPages(null);
  }


  loadDocTitle() {
    if (this.outline && this.selectedFamilia) {
       this.docTitle =  this.selectedFamilia.title;
    }
  }

  /* ROTATION */

  private leftTurn() {
    this.rotation += -90;
  }

  private rightTurn() {
    this.rotation += 90;
  }

  private resetRotation() {
    this.rotation = 0;
  }

  /* ZOOM */

  private minusZoom() {
    this.zoom = 0.5;
  }

  private plusZoom() {
    if (this.zoom !== 2.5) {
      this.zoom += 0.5;
    }
  }

  private resetZoom() {
    this.zoom = 1;
  }

  private printPdf(){
    
    this.pdf.getData().then((u8) => {
      
      let blob = new Blob([u8.buffer], {type: 'application/pdf' });
     
      const blobUrl = window.URL.createObjectURL(blob);
      const iframe = document.createElement('iframe');

      iframe.style.display = 'none';
      iframe.src = blobUrl;
    
      document.body.appendChild(iframe);
      iframe.contentWindow.print();
      
    });
  }

  private downloadPdf(){
    this.pdf.getData().then((u8) => {
      let blob = new Blob([u8.buffer], {type: 'application/pdf' });
      if (window.navigator && window.navigator.msSaveOrOpenBlob){
          window.navigator.msSaveOrOpenBlob(blob, this.filename);
      } else {          
          let url = URL.createObjectURL(blob);
  
          let element = document.createElement('a');
          document.body.appendChild(element);
          element.style.display = 'none';
          element.href = url;
          element.download = this.filename;
          element.click();
      }
    });
  }

}
