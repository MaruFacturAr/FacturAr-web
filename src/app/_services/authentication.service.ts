import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'; 
import * as jwt_decode from "jwt-decode";
import { CMXConfig } from 'config/config';
import { Observable } from 'rxjs';
import { usuario } from 'app/_models/usuario';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient) { }
    
    login(params:any) {
        let obj = Object.assign({}, params);
        return this.http.post(CMXConfig.environment.apiURL + '/authenticate', obj);
    }

    getToken(): string {
        return JSON.parse(localStorage.getItem('currentUserCmx')).auth_token;
    }   

    // logout():any {

    //     let url = CMXConfig.environment.apiURL  + '/account/logout';
              
    //     return this.http.get(url);
    // }

    getDecodedAccessToken(): any {
      try
      {
          return jwt_decode(JSON.parse(localStorage.getItem('currentUserCmx')).auth_token);
      }
      catch(Error)
      {
          return null;
      }
    }

    getCurrentUserInfo():any{
      let userCurrent =  this.getDecodedAccessToken();
      let url = CMXConfig.environment.apiURL  +`/users/userSimpleInfo/` + userCurrent.sub;
      return this.http.get(url);
    }

    getFullCurrentUserInfo():any{
      let userCurrent =  this.getDecodedAccessToken();
      let url = CMXConfig.environment.apiURL  +`/users/userFullInfo/` + userCurrent.sub;
      return this.http.get(url);
    }
    
    refreshToken(): Observable<any> {
      let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    
      let options = { headers: httpHeaders };
      
      return this.http.post(`${CMXConfig.environment.apiURL}/account/refreshToken`,
      JSON.stringify(this.getToken()),options).pipe(map((auth_token:any) => {                  
        localStorage.setItem('currentUserCmx', auth_token);
        return auth_token;
      }));
    }

    obtenerUrlsHerramientas():any{
      let url = CMXConfig.environment.apiURL  + '/Clientes/obtenerUrlsHerramientasData';
      return this.http.get(url);
    }

    public createPassword(user: usuario) {
      // tslint:disable-next-line:max-line-length
      let url = CMXConfig.environment.apiURL + '/Account/createPassword?cuit=' + user.username + '&password=' + encodeURIComponent(user.password);

      return this.http.get(url);        
  }

  public forgotPassword(user: usuario) {

    let url = CMXConfig.environment.apiURL + '/Account/forgotPassword?cuit=' + user.username;

    return this.http.get(url);
  }

  public changePasswordConfirm(changePassToken: string, userName: string) {
    let url = CMXConfig.environment.apiURL + '/Account/changePasswordConfirm?verificationcode=' + changePassToken + '&cuit=' + userName;

    return this.http.get(url);
  }
}
