import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../_services/loader.service';
import { LoaderState } from '../../_helpers/loader';
import { SnotifyService, SnotifyToastConfig } from 'ng-snotify';

@Component({
  selector: 'app-loader',
  templateUrl: './app-loader.component.html',
  styleUrls: ['./app-loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  
  show = false;
  isShowing:boolean = false;
  nId:number;

  private subscription: Subscription;

  constructor(private loaderService: LoaderService,
              private _notificationService: SnotifyService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
      
      this.show = state.show;
      
      if(state.showLoadingInfo)
      {
        if(!this.isShowing){
          const notification = this._notificationService.info("La consulta está tardando más de lo esperado, por favor aguarde unos instantes.", { timeout:0 })
          
          this.nId = notification.id;
          this.isShowing = true;
        }
      } else {
        this._notificationService.remove(this.nId);
        this.isShowing = false;
      }

    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}