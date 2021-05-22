import { CMXConfig } from 'config/config';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable()
export class CMXStorageService {

  constructor(private _sessionStorage:SessionStorageService) { }

  public removeGuiasStorage(){
    this._sessionStorage.clear("CMX-GUIAS-OPERACIONES-AGREGADAS");
    this._sessionStorage.clear("CMX-GUIAS-DESPACHANTE");
    this._sessionStorage.clear("CMX-GUIAS-OPERACIONES-BUSQUEDA");
    this._sessionStorage.clear("CMX-GUIAS-GUIA");
    this._sessionStorage.clear("CMX-GUIAS");
    this._sessionStorage.clear("CMX-GUIAS-FILTROS");
  }

  public removeDespachosStorage(){
    this._sessionStorage.clear("CMX-DESPACHO");
    this._sessionStorage.clear("CMX-DESPACHOS");
    this._sessionStorage.clear("CMX-DESPACHOS-FILTROS");
  }

  public removeGuiasManiStorage(){
    this._sessionStorage.clear("CMX-GUIAS-MANI-FILTROS");
    this._sessionStorage.clear("CMX-GUIAS-MANI");
    this._sessionStorage.clear("CMX-GUIAS-MANI-ATA")
  }

  public removeSolicitudesStorage(){
    this._sessionStorage.clear("CMX-SOLICITUDORIGINALES-FILTROS");
    this._sessionStorage.clear("CMX-SOLICITUDES");
  }

  public removeDeclaracionesStorage(){
    this._sessionStorage.clear("CMX-DECLARACIONES-FILTROS");
    this._sessionStorage.clear("CMX-DECLARACIONES");
    this._sessionStorage.clear("CMX-DECLARACION");
    this._sessionStorage.clear("CMX-DECLARACION-CARATULA");
    this._sessionStorage.clear("CMX-DECLARACION-CURRENTSTATE");
    this._sessionStorage.clear("CMX-DECLARACION-DOCUMENTOS");
    this._sessionStorage.clear("CMX-DECLARACION-ITEMS");
    this._sessionStorage.clear("CMX-DECLARACION-DIGITALIZACIONES");
    this._sessionStorage.clear("CMX-DECLARACION-BLOQUEOS");
    this._sessionStorage.clear("CMX-DECLARACION-TRAZABILIDAD");
  }

  public removeDeclaracionesAnticipadasStorage(){
    this._sessionStorage.clear("CMX-ANTICIPADAS-FILTROS");
    this._sessionStorage.clear("CMX-ANTICIPADAS");
    this._sessionStorage.clear("CMX-ANTICIPADA");
    this._sessionStorage.clear("CMX-DECLARACION-ANTICIPADA-CARATULA");
    this._sessionStorage.clear("CMX-DECLARACION-ANTICIPADA-TORGANISMO");
    this._sessionStorage.clear("CMX-DECLARACION-ANTICIPADAS-ITEMS");
    this._sessionStorage.clear("CMX-DECLARACION-CURRENTSTATE");
    // this._sessionStorage.clear("CMX-DECLARACION-CARATULA");
   
    // this._sessionStorage.clear("CMX-DECLARACION-DOCUMENTOS");
    
    // this._sessionStorage.clear("CMX-DECLARACION-DIGITALIZACIONES");
    // this._sessionStorage.clear("CMX-DECLARACION-BLOQUEOS");
    // this._sessionStorage.clear("CMX-DECLARACION-TRAZABILIDAD");
  }

  public removeDebitosStorage(){
    this._sessionStorage.clear("CMX-DEBITOS-FILTROS");
    this._sessionStorage.clear("CMX-DEBITOS");
  }

  public removeDeudaStorage(){
    this._sessionStorage.clear("CMX-DEUDA-FILTROS");
    this._sessionStorage.clear("CMX-DEUDA");
  }

  public removeVencimientoPSADStorage(){
    this._sessionStorage.clear("CMX-VENCIMIENTOSPSAD-FILTROS");
    this._sessionStorage.clear("CMX-VENCIMIENTOSPSAD");
  }

  public removeCajasEspecialesSolicitudesStorage(){
    this._sessionStorage.clear("CMX-CAJASESPECIALES-FILTROS");
    this._sessionStorage.clear("CMX-CAJASESPECIALES");
  }

  public removeCajasEspecialesStorage(){
    this._sessionStorage.clear("CMX-CAJASESPECIALESCAJAS-FILTROS");
    this._sessionStorage.clear("CMX-CAJASESPECIALESCAJAS");
  }

  

  
  
}