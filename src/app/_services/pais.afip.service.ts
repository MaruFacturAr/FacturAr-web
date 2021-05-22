import { CMXConfig } from 'config/config';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaisAfipService {

  constructor(private http: HttpClient) { }

  getPaisesAfip() {
    const tipoDocumentoURL = CMXConfig.environment.apiURL  + '/PaisesAfip';
    return this.http.get(tipoDocumentoURL);
  }


}
