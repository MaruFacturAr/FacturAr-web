import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { CMXConfig } from 'config/config';
import { CompareType } from 'app/_enums/compare.types.enum';

export function ValidateCompareValue(controlName1:string, type:CompareType, controlName2: any) : ValidatorFn{
    return (formGroup: FormGroup): {[key: string]: boolean } | null => {
        
        //TODO: Comprar FECHAS

        let value1 = formGroup.controls[controlName1].value;
        let value2 = formGroup.controls[controlName2].value;

        const errorsControl1 = formGroup.get(controlName1).errors;

        if(value1 && value2){

            value1 = parseFloat(value1);
            value2 = parseFloat(value2);

            switch(type){
                case CompareType.GreaterThan:
                    if(value1 < value2) {
                        formGroup.get(controlName1).setErrors(Object.assign({invalidGreaterThan : true}, errorsControl1));
                    } else {
                        if(errorsControl1 && errorsControl1.hasOwnProperty("invalidGreaterThan")){
                            delete errorsControl1["invalidGreaterThan"];
                            if(errorsControl1 && Object.keys(errorsControl1).length == 0){
                                formGroup.get(controlName1).setErrors(null);
                            }
                        }
                    }
                    break;
                case CompareType.LowerThan:
                    if(value1 > value2) {
                        formGroup.get(controlName1).setErrors(Object.assign({invalidLowerThan : true}, errorsControl1));
                    } else {
                        if(errorsControl1 && errorsControl1.hasOwnProperty("invalidLowerThan")){
                            delete errorsControl1["invalidLowerThan"];
                            if(errorsControl1 && Object.keys(errorsControl1).length == 0){
                                formGroup.get(controlName1).setErrors(null);
                            }
                        }
                    }
                    break;
            }
        } else {

            formGroup.get(controlName1).setErrors(null);
            formGroup.get(controlName2).setErrors(null);

            return null;
        }
    }
}
