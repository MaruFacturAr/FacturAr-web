import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {throwError, Observable} from 'rxjs';
import { switchMap,take, catchError, finalize } from 'rxjs/operators';
import { HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'app/_services/authentication.service';
import { TranslateService } from '@ngx-translate/core';

export abstract class BaseService {
    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(protected _authorizationService:AuthenticationService,
                private _translateService:TranslateService){}

    protected handleError(error: any) {
        var errors = this.catchError(error);

        return throwError(errors);
    }
  
    protected catchError(error):string{
        let errors;
        let modelState:any;

        switch(error.status){
            case (400):
                for (var key in error['error']) {
                    modelState = error.error[key];

                    if(modelState){
                        for (var index in modelState) {
                            errors += modelState[index] + '\n';
                        }
                    }
                }  
                break;
            case (403):
                errors = this._translateService.instant('CMXError.Error_403');
                break;
            case (409):
                errors = this._translateService.instant('CMXError.Error_409');
                break;
            case (404):
                for (var key in error['error']) {
                    if(!error.error[key].errors)
                        return modelState = error.error[key];

                    modelState = error.error[key].errors;

                    if(modelState){
                        for (var index in modelState) {
                            errors += modelState[index].errorMessage + '\n';
                        }
                    }
                }   
                break;
            default:
                errors = error;
                break;
        }
        return errors;
    }
   
    handle401(request: HttpRequest<any>, next: HttpHandler, error:HttpErrorResponse) {
        if(error.error && error.error.indexOf("token is expired")){
            this.isRefreshingToken = false;
            return this.logoutUser();
        }
        
        // if (!this.isRefreshingToken) {
        //     this.isRefreshingToken = true;

        //     this.tokenSubject.next(null);
 
        //     return this._authorizationService.refreshToken().pipe(
        //         switchMap((newToken: any) => {
        //             if (newToken) {
        //                 this.tokenSubject.next(newToken);
        //                 return next.handle(this.addToken(request, JSON.parse(newToken)));
        //             }

        //             this.logoutUser();
        //         })
        //         ,finalize(() => { 
        //             this.isRefreshingToken = false;                  
        //         })
        //         );
        //     } else {
        //     return this.tokenSubject
        //         .filter(token => token != null).pipe(
        //         take(1),
        //         switchMap(token => {
        //             return next.handle(this.addToken(request, JSON.parse(token)));
        //     }));
        // }
    }

    addToken(request: HttpRequest<any>, token: any): HttpRequest<any> {
        return request.clone({
          setHeaders: { 
              'Content-Type' : 'application/json; charset=utf-8',
              'Accept'       : 'application/json',
              Authorization: `Bearer ${token.auth_token}`
          }
      });
    }

    logoutUser() {
        localStorage.removeItem('currentUserCmx');
                      
        location.reload(true);
  
        return throwError(null);
    }
}