import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Invoice } from "app/_models/invoice.model";
import { CMXConfig } from "config/config";

@Injectable()
export class InvoiceService{
    
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Invoice[]>(CMXConfig.environment.apiURL +`/invoices`);
      }

      register(invoice: Invoice) {
        let obj = Object.assign({}, invoice);
        return this.http.post(CMXConfig.environment.apiURL + `/invoices/create`, obj);
    }

    getAllByCodeOrName(params: any) {
      let obj = Object.assign({}, params);
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] == "string" && obj[key] != null) {
          obj[key] = obj[key].trim();
        }
      });

      let queryParams = Object.keys(obj) 
      .filter(key => !(obj[key] == null || obj[key] == ''))
      .reduce((acc, key) => Object.assign(acc, { [key]: obj[key] }), {});
  
      let url = CMXConfig.environment.apiURL + '/invoices/find';
      return this.http.get(url, { params: queryParams });
    }
}