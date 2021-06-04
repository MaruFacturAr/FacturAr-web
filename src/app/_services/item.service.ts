import { HttpClient } from "@angular/common/http";
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
          if (typeof obj[key] == "string") {
            obj[key] = obj[key].trim();
          }
        });
      
    
        let url = CMXConfig.environment.apiURL + '/items/find?';
        return this.http.get(url, { params: obj });
      }

      register(item: Item) {
        let obj = Object.assign({}, item);
        return this.http.post(CMXConfig.environment.apiURL + `/items/create`, obj);
    }
}