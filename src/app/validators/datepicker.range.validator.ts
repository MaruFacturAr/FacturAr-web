import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';
import { CMXConfig } from 'config/config';

export function ValidateDatePickerRange(days: number) : ValidatorFn{
    return (control: AbstractControl): {[key: string]: boolean } | null => {

        if(!control.value) return null;
        
        const day1 = moment(control.value[1]).set({hour:0, minute:0, second:0});
        const day2 = moment(control.value[0]).set({hour:0, minute:0, second:0});

        if (day1.diff(day2, 'days') > days + 2){
            return { invalidRange: true }
        };
        return null;
    }
}
