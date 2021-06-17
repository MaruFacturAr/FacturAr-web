import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Counterfoil } from "app/_models/counterfoil.model";
import { CMXConfig } from "config/config";

@Injectable()
export class CounterfoilService{
    
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Counterfoil[]>(CMXConfig.environment.apiURL +`/counterfoils`);
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
    
        let url = CMXConfig.environment.apiURL + '/counterfoils/find';
        return this.http.get(url, { params: queryParams });
      }

      register(item: Counterfoil) {
        let obj = Object.assign({}, item);
        return this.http.post(CMXConfig.environment.apiURL + `/counterfoils/create`, obj);
    }

    activate(data:any) {
      let obj = Object.assign({}, data);
      return this.http.post(CMXConfig.environment.apiURL + `/counterfoils/activate`, obj);
  }

  deactivate(data:any) {
    let obj = Object.assign({}, data);
    return this.http.post(CMXConfig.environment.apiURL + `/counterfoils/deactivate`,obj);
  }

  delete(id){
      let itemURL = CMXConfig.environment.apiURL  + '/counterfoils/' + id;
  
      itemURL.replace('\?\&', '?');
    
      return this.http.delete(itemURL);
    }
}