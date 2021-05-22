import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of'
import { usuario } from '../_models/usuario';
import { CMXConfig } from 'config/config';
import { User } from 'app/_models/user.model';

@Injectable()
export class UsuarioService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<usuario[]>(`/users`);
    }

    getCurrentUser(): Observable<any> {
        return of(localStorage.getItem('currentUserCmx'));
    }

    getById(id: number) {
        return this.http.get( CMXConfig.environment.apiURL  +`/clientes/` + id);
    }

    register(user: User) {
        let obj = Object.assign({}, user);
        return this.http.post(CMXConfig.environment.apiURL + `/registerUser`, obj);
    }

    

    delete(id: number) {
        return this.http.delete(`/account/` + id);
    }

    getByCuit(cuit: string) {
        return this.http.get(CMXConfig.environment.apiURL  + `/Clientes/GetUserByCuit?documento=` + cuit);
    }

    update(params: any) {

        let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    
        let options = { headers: httpHeaders };
        return this.http.put( CMXConfig.environment.apiURL  + '/Clientes', params, options);
    }

}

    