import { CMXConfig } from 'config/config';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProvinceModel } from 'app/_models/province.model';

@Injectable()
export class ProvinceService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<ProvinceModel[]>(CMXConfig.environment.apiURL +`/provinces`);
  }


}