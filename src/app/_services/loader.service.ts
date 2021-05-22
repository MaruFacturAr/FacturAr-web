import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from '../_helpers/loader';
@Injectable()
export class LoaderService {

  private loaderSubject = new Subject<LoaderState>();
  timeout:any;
  timeoutArray:Array<any> = [];

  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  show(url:string) {
    
    this.loaderSubject.next(<LoaderState>{ show: true, showLoadingInfo: false });

    //Si la consulta demora más de 10 segundos, se le notifica al usuario que siga aguardando.
    this.timeout = setTimeout(() => {
      this.loaderSubject.next(<LoaderState>{ show: true, showLoadingInfo: true });  
    }, 10000);

    this.timeoutArray.push(this.timeout);
  }

  hide() {
    this.loaderSubject.next(<LoaderState>{ show: false, showLoadingInfo: false });
    
    this.timeoutArray.forEach(element => {
      clearTimeout(element);  
    });

    this.timeoutArray = [];
  }

}