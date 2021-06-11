import { HttpClient } from "@angular/common/http";
import { identifierModuleUrl } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Item } from "app/_models/item.model";
import { CMXConfig } from "config/config";

@Injectable()
export class ItemService{
    
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Item[]>(CMXConfig.environment.apiURL +`/items`);
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
    
        let url = CMXConfig.environment.apiURL + '/items/find';
        return this.http.get(url, { params: queryParams });
      }

      register(item: Item) {
        let obj = Object.assign({}, item);
        return this.http.post(CMXConfig.environment.apiURL + `/items/create`, obj);
    }

    activate(data:any) {
      let obj = Object.assign({}, data);
      return this.http.post(CMXConfig.environment.apiURL + `/items/activate`, obj);
  }

  deactivate(data:any) {
    let obj = Object.assign({}, data);
    return this.http.post(CMXConfig.environment.apiURL + `/items/deactivate`,obj);
  }

  delete(id){
      let itemURL = CMXConfig.environment.apiURL  + '/items/' + id;
  
      itemURL.replace('\?\&', '?');
    
      return this.http.delete(itemURL);
    }
}