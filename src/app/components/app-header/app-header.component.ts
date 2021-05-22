import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowRefService } from 'app/_services/windowRef.service';
import { AuthenticationService } from 'app/_services/authentication.service';
import { SnotifyService } from 'ng-snotify';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';
import { CMXConfig } from 'config/config';


@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ["./app-header.component.scss"]
})
export class AppHeaderComponent implements OnInit {

  public currentUser:object = null;

  
  constructor(private router:Router,
              private windowRefService: WindowRefService,
              private _authenticationService:AuthenticationService,
              private _notificationService:SnotifyService,
              private _localStorage:LocalStorageService,
              private _sessionStorage:SessionStorageService,
              private _translateService:TranslateService){ 
                  _translateService.use("es");
              }

  ngOnInit(){
        
    this._authenticationService.getCurrentUserInfo().subscribe((user) => {
        this.currentUser = user;
    }, error => {
        this._notificationService.error(this._translateService.instant("CMXError.Error_003"));
        this.logout();
    });
    
  }

  logout() {

        this._localStorage.clear();
        this._sessionStorage.clear();
      
        this.windowRefService.nativeWindow.open(CMXConfig.environment.loginURL, '_self');

    }     
 }
