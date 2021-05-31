import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Company } from "app/_models/company.model";
import { CMXConfig } from "config/config";

@Injectable()
export class CompanyService{
    constructor(private http: HttpClient) { }

    get() {
      return this.http.get<Company>(CMXConfig.environment.apiURL +`/company`);
    }
  
    register(company: Company) {
        let obj = Object.assign({}, company);
        return this.http.post(CMXConfig.environment.apiURL + `/company/create`, obj);
    }

}