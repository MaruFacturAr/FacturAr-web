import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { VoucherType } from "app/_models/voucher.type.model";
import { CMXConfig } from "config/config";

@Injectable()
export class VoucherTypeService{
    constructor(private http: HttpClient) { }

    getAll() {
      return this.http.get<VoucherType[]>(CMXConfig.environment.apiURL +`/vouchertypes`);
    }
}