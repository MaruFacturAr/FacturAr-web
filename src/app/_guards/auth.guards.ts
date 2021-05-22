import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { WindowRefService } from 'app/_services/windowRef.service';
import { CMXConfig } from 'config/config';
import * as jwt_decode from "jwt-decode";
import * as moment from 'moment';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private windowRefService: WindowRefService,
                private _localStorage:LocalStorageService,
                private _sessionStorage:SessionStorageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (localStorage.getItem('currentUserCmx')) {
            const token = jwt_decode(JSON.parse(localStorage.getItem('currentUserCmx')).auth_token);
            const isTokenExpired = moment(token.exp * 1000).isBefore(new Date());
            
            if(isTokenExpired) {
                this._localStorage.clear();
                this._sessionStorage.clear();
                this.windowRefService.nativeWindow.open(CMXConfig.environment.loginURL, '_self');
                return false;
            }
        
            return true;
        } else {
            this.windowRefService.nativeWindow.open(CMXConfig.environment.loginURL, '_self');
        
            return false;
        }
    }
}