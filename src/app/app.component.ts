import { Component } from '@angular/core';
import { RoutingState } from './_services/routing.service';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'body',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private _notificationService:NotifierService,
              private _routingService: RoutingState,
              private _translateService: TranslateService){
      
      //Comienza el trackeo de navegación para detectar cambios en las rutas
      this._routingService.loadRouting();
      this._translateService.use('es');


  }

  
}
