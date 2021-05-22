import { CMXConfig } from 'config/config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import moment from 'moment';

@Injectable()
export class ServiciosAFIPDelegadosService {

  constructor(private http: HttpClient) { }

  updateFechaNotificado(servicioAFIPDelegado:any) {
    const url = CMXConfig.environment.apiURL  + '/ServiciosAFIPDelegados';
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    
    let options = { headers: httpHeaders };

    servicioAFIPDelegado.fechaNotificado = moment(new Date()).format();
    return this.http.put(url, servicioAFIPDelegado, options);
  }

  updateNoShowAgain(servicioAFIPDelegado:any){
    const url = CMXConfig.environment.apiURL  + '/ServiciosAFIPDelegados/NoShowAgain';
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    
    let options = { headers: httpHeaders };

    servicioAFIPDelegado.notificar = "N";
    return this.http.put(url, servicioAFIPDelegado, options);
  }
  
}