import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CMXConfig } from "config/config";

@Injectable()
export class DocumentTypeService{

    constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<DocumentType[]>(CMXConfig.environment.apiURL +`/DocumentType`);
  }

}