import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TaxpayerType } from "app/_models/taxpayer.type.model";
import { CMXConfig } from "config/config";

@Injectable()
export class TaxpayerTypeService{
    constructor(private http: HttpClient) { }

    getAll() {
      return this.http.get<TaxpayerType[]>(CMXConfig.environment.apiURL +`/TaxpayerType`);
    }
}