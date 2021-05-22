import { Component } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { RoutingState } from './_services/routing.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'body',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private _notificationService:SnotifyService,
              private _routingService: RoutingState,
              private _translateService: TranslateService){
      
      //Comienza el trackeo de navegación para detectar cambios en las rutas
      this._routingService.loadRouting();
      this._translateService.use('es');
      this._notificationService.setDefaults({
        toast: {
          timeout:7000,
          position: 'leftBottom',
          titleMaxLength: 50
        }
      })

  }

  
}
