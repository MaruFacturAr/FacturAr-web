import { FormGroup } from '@angular/forms';


export function ConfirmPasswordValidator(form: FormGroup) {
    
    const passA = form.get('Password').value;
    const passB = form.get("Password2").value;

    const errorsA = form.get('Password').errors;
    const errorsB = form.get('Password2').errors;

    if(!passA && !passB){
        form.get('Password').setErrors(null);
        form.get('Password2').setErrors(null);
        return null;
    }
    
    if(passA != passB){

        form.get('Password').setErrors(Object.assign({invalidPasswords : true}, errorsA));
        form.get('Password2').setErrors(Object.assign({invalidPasswords : true}, errorsB));

    } else {

        if(errorsA && errorsA.hasOwnProperty("invalidPasswords")){
            delete errorsA["invalidPasswords"];
            if(errorsA && Object.keys(errorsA).length == 0){
                form.get('Password').setErrors(null);
            }
        }
        
        if(errorsB && errorsB.hasOwnProperty("invalidPasswords")){
            delete errorsB["invalidPasswords"];
            if(errorsB && Object.keys(errorsB).length == 0){
                form.get('Password2').setErrors(null);
            }
        }
    }
  }
