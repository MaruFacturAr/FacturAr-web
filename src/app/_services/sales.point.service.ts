import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SalesPoint } from "app/_models/sales.point.model";
import { CMXConfig } from "config/config";

@Injectable()
export class SalesPointService{
    
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<SalesPoint[]>(CMXConfig.environment.apiURL +`/salespoints`);
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
    
        let url = CMXConfig.environment.apiURL + '/salespoints/find';
        return this.http.get(url, { params: queryParams });
      }

      register(item: SalesPoint) {
        let obj = Object.assign({}, item);
        return this.http.post(CMXConfig.environment.apiURL + `/salespoints/create`, obj);
    }

    activate(data:any) {
      let obj = Object.assign({}, data);
      return this.http.post(CMXConfig.environment.apiURL + `/salespoints/activate`, obj);
  }

  deactivate(data:any) {
    let obj = Object.assign({}, data);
    return this.http.post(CMXConfig.environment.apiURL + `/salespoints/deactivate`,obj);
  }

  delete(id){
      let itemURL = CMXConfig.environment.apiURL  + '/salespoints/' + id;
  
      itemURL.replace('\?\&', '?');
    
      return this.http.delete(itemURL);
    }
}