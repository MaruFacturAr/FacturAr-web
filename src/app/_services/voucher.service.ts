import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Voucher } from "app/_models/voucher.model";
import { CMXConfig } from "config/config";

@Injectable()
export class VoucherService{
    
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Voucher[]>(CMXConfig.environment.apiURL +`/vouchers`);
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
    
        let url = CMXConfig.environment.apiURL + '/vouchers/find';
        return this.http.get(url, { params: queryParams });
      }

      register(item: Voucher) {
        let obj = Object.assign({}, item);
        return this.http.post(CMXConfig.environment.apiURL + `/vouchers/create`, obj);
    }

    activate(data:any) {
      let obj = Object.assign({}, data);
      return this.http.post(CMXConfig.environment.apiURL + `/vouchers/activate`, obj);
  }

  deactivate(data:any) {
    let obj = Object.assign({}, data);
    return this.http.post(CMXConfig.environment.apiURL + `/vouchers/deactivate`,obj);
  }

  delete(id){
      let itemURL = CMXConfig.environment.apiURL  + '/vouchers/' + id;
  
      itemURL.replace('\?\&', '?');
    
      return this.http.delete(itemURL);
    }
}