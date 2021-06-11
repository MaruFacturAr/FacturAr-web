import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { CMXStorageService } from './cmx.storage.service';

// declare ga as a function to set and sent the events


@Injectable()
export class RoutingState {
    private history = [];
    

    constructor(private router: Router,
                private route: ActivatedRoute,
                private _sessionStorage:SessionStorageService,
                private _cmxStorageService:CMXStorageService) {
    
    }

  public loadRouting(): void {
    
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
                      .subscribe(({urlAfterRedirects}: NavigationEnd) => {
                
                        this.history = [...this.history, urlAfterRedirects];

                        //Se colapsa el menu en Mobile
                        document.querySelector('body').classList.remove('sidebar-mobile-show');
      
                        if(urlAfterRedirects.indexOf("/guias/nueva") == -1 &&
                           urlAfterRedirects.indexOf("/guias/editar") == -1 &&
                           urlAfterRedirects.indexOf("/guias/detalle") == -1 &&
                           urlAfterRedirects.indexOf("/guias") == -1 &&
                           urlAfterRedirects.indexOf("/guias/resumen") == -1){
                             this._cmxStorageService.removeGuiasStorage();
                        }

                        if(urlAfterRedirects.indexOf("/guiasmani") == -1 &&
                           urlAfterRedirects.indexOf("/guiasmani/ingreso") == -1 &&
                           urlAfterRedirects.indexOf("/guiasmani/detalle") == -1 &&
                           urlAfterRedirects.indexOf("/guiasmani/nueva") == -1) {
                            this._cmxStorageService.removeGuiasManiStorage();
                        }

                        if(urlAfterRedirects.indexOf("/despachos") == -1 && 
                           urlAfterRedirects.indexOf("/despachos/detalle") == -1){
                            this._cmxStorageService.removeDespachosStorage();
                        }

                        if(urlAfterRedirects.indexOf("/despachos/solicitaroriginal/pendientes") == -1){
                          this._cmxStorageService.removeSolicitudesStorage();
                        }

                        if(urlAfterRedirects.indexOf("/declaraciones") == -1){
                          this._cmxStorageService.removeDeclaracionesStorage();
                        }

                        if(urlAfterRedirects.indexOf("/anticipadas") == -1){
                          this._cmxStorageService.removeDeclaracionesAnticipadasStorage();
                        }

                        if(urlAfterRedirects.indexOf("/reportedebitos") == -1){
                          this._cmxStorageService.removeDebitosStorage();
                        }

                        if(urlAfterRedirects.indexOf("/reportedeuda") == -1){
                          this._cmxStorageService.removeDeudaStorage();
                        }

                        if(urlAfterRedirects.indexOf("/reportevtopsad") == -1){
                          this._cmxStorageService.removeVencimientoPSADStorage();
                        }

                        if(urlAfterRedirects.indexOf("/cajasespeciales/solicitudes") == -1){
                          this._cmxStorageService.removeCajasEspecialesSolicitudesStorage();
                        }

                        if(urlAfterRedirects.indexOf("/cajasespeciales") == -1){
                          this._cmxStorageService.removeCajasEspecialesStorage();
                        }

                        if(urlAfterRedirects.indexOf("/item/nuevo")== -1){
                          this._cmxStorageService.removeItemStorage();
                        }
                        
                      
                        
      });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public getPreviousUrl(): string {
    return this.history[this.history.length - 2] || '/dashboard';
  }

  

}