import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse, HttpHeaderResponse, HttpProgressEvent, HttpUserEvent, HttpSentEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {  catchError, tap, finalize } from 'rxjs/operators';
import { BaseService } from 'app/_services/base.service';
import { switchMap,take } from 'rxjs/operators';
import { LoaderService } from '../_services/loader.service';
import { AuthenticationService } from 'app/_services/authentication.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class JwtInterceptor extends BaseService implements HttpInterceptor {


    constructor(private loaderService: LoaderService, 
                protected _authorizationService:AuthenticationService,
                _translateService:TranslateService) { 
                    super(_authorizationService, _translateService)
                }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>>  {       

        this.showLoader(request.url);
        
        let currentUser = JSON.parse(localStorage.getItem('currentUserCmx'));       
        
        if (currentUser && currentUser.auth_token) 
            request = this.addToken(request,currentUser);        

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse)
              this.onEnd();
  
          })).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse) {
                if((<HttpErrorResponse>error).status == 401)
                    return this.handle401(request, next, error);
                else
                    return this.handleError(error);
            }
            else{
                this.onEnd();
                return this.handleError(error)
            }    
        }));
    }

    private onEnd(): void {
        this.hideLoader();
    }
    
    private showLoader(url:string): void {
        this.loaderService.show(url);
    }

    private hideLoader(): void {
        this.loaderService.hide();
    }   
}