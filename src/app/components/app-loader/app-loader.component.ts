import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../_services/loader.service';
import { LoaderState } from '../../_helpers/loader';
import { NotifierService } from 'angular-notifier';


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
              private _notificationService: NotifierService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
      
      this.show = state.show;
      
      if(state.showLoadingInfo)
      {
        if(!this.isShowing){
          
          this._notificationService.show({
            type: 'default',
            message: 'La consulta está tardando más de lo esperado, por favor aguarde unos instantes.',
            id: 'NOT_TOO_SLOW'
          });
          
          this.isShowing = true;
        }
      } else {
        this._notificationService.hide('NOT_TOO_SLOW');
        this.isShowing = false;
      }


    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}