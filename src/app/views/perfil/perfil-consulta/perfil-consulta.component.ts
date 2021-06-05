import { Component, DebugElement } from '@angular/core';
import { ExcelService } from 'app/_services/excel.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'app/_services/authentication.service';
import { CMXAnimations } from 'app/_helpers/animations';
import { UsuarioService } from 'app/_services/usuario.service';
import { SessionStorage } from 'ngx-webstorage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from 'app/validators/confirm.password.validator';
import { User } from 'app/_models/user.model';
import { Address } from 'app/_models/address.model';
import { NotifierService } from 'angular-notifier';

@Component({
    templateUrl: 'perfil-consulta.component.html',
    animations: [ CMXAnimations ]
})

export class PerfilConsultaComponent  {    

    @SessionStorage("CMX-CURRENT-USER")
    usuario:User;

    token:string;
        
    constructor(_excelService: ExcelService,
                private _notificationService: NotifierService,
                private _authenticationService: AuthenticationService,
                _translateService: TranslateService,
                private usuarioService: UsuarioService)
    {

    }

    CMXFormGroup = new FormGroup({
        Email: new FormControl(this.usuario.email, [ Validators.email, Validators.required ]),
        Domicilio: new FormControl(this.usuario.address.street, Validators.maxLength(200)),
        Password: new FormControl('', [  Validators.minLength(8), Validators.maxLength(120) ]),
        Password2: new FormControl('', [  Validators.minLength(8), Validators.maxLength(120) ]),
    }, [ ConfirmPasswordValidator ])

    guardarCambios(){
       
        this.usuarioService.update(this.CMXFormGroup.value).subscribe((result:User) => {

            this.usuario.email = result.email;
            this.usuario.address = new Address();
            this.usuario.address.street = result.address.street;
            this.usuario = this.usuario;

            this._notificationService.notify('success','Los datos fueron actualizados correctamente.');

        }, error => {
            this._notificationService.notify('success', "Ocurrió un error al intentar actualizar los datos.");
        });   
    }

    getToken() {
        this.token = this._authenticationService.getToken();
    }

    onTokenCopied(event){
        this._notificationService.notify('success',"El TOKEN fue copiado a su portapapeles.")
    }
}