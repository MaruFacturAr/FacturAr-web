import { CMXConfig } from 'config/config';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NavigationService {

  constructor(private http: HttpClient) { }

  getNavigations(): Observable<any> {
    const NavURL = CMXConfig.environment.apiURL  + '/navigation';
    
    return this.http.get(NavURL);
  }
}
