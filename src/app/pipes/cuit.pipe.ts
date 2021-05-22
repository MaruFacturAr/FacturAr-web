import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'cuit'})
export class CUITPipe implements PipeTransform {
  transform(value: string): string {

    if(value){
      let cuit = value.substr(0,2);
      cuit += "-" + value.substr(2,8);
      cuit += "-" + value.substr(10,1);
      return cuit;
    } else {
      return null;
    }
  }
}