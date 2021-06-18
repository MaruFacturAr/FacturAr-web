import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Customer } from "app/_models/customer.model";
import { CMXConfig } from "config/config";

@Injectable()
export class CustomerService{
    
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Customer[]>(CMXConfig.environment.apiURL +`/customers`);
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
    
        let url = CMXConfig.environment.apiURL + '/customers/find';
        return this.http.get(url, { params: queryParams });
      }

      register(item: Customer) {
        let obj = Object.assign({}, item);
        return this.http.post(CMXConfig.environment.apiURL + `/customers/create`, obj);
    }

    activate(data:any) {
      let obj = Object.assign({}, data);
      return this.http.post(CMXConfig.environment.apiURL + `/customers/activate`, obj);
  }

  deactivate(data:any) {
    let obj = Object.assign({}, data);
    return this.http.post(CMXConfig.environment.apiURL + `/customers/deactivate`,obj);
  }

  delete(id){
      let itemURL = CMXConfig.environment.apiURL  + '/customers/' + id;
  
      itemURL.replace('\?\&', '?');
    
      return this.http.delete(itemURL);
    }
}