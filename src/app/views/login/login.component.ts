import { ValidateCompareValue } from 'app/validators/compare.values.validator';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { usuario } from 'app/_models/usuario';
import { ConfirmPasswordValidator } from 'app/validators/confirm.password.validator';
import { WindowRefService } from 'app/_services/windowRef.service';
import { NotifierService } from 'angular-notifier';

@Component({ templateUrl: 'login.component.html', styleUrls: ['login.component.scss'] })
export class LoginComponent implements OnInit {



  loading = false;
  submitted = false;
  returnUrl: string;
  tokenJWT: string;
  isSettings = false;
  public passRenew: Boolean;
  public showForgotPassword: Boolean;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(11)]),
    password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(12)])
  })


  // passRenewForm = new FormGroup({
  //     cuit: new FormControl('', [Validators.required]),
  //     passwordGroup: this.formBuilder.group({
  //       Password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12) ]],
  //       Password2: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12) ]]
  //     }, {validator: [ConfirmPasswordValidator]})
  //   });

  // forgotPasswordForm = new FormGroup({
  //     cuit: new FormControl('', [Validators.required])
  //   });
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private _notificationService: NotifierService,
    private _translateService: TranslateService,
    private formBuilder: FormBuilder,
    private windowRefService: WindowRefService) {
    //Internacionalización
    //TODO: Guardar la cultura en el sessionStorage para poder persistir el cambio en todo el sitio
    this._translateService.setDefaultLang('es');
    this._translateService.use('es');
  }

  ngOnInit() {
    this.passRenew = false;
    this.showForgotPassword = false;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.tokenJWT = this.route.snapshot.queryParams['token'];


    if (this.tokenJWT) {
      localStorage.setItem('currentUserCmx', JSON.stringify({ auth_token: this.tokenJWT, expires_in: 32400 }));
      this.router.navigate(['/']);
    }
    else {
     
        localStorage.removeItem('currentUserCmx');
    }

  }

  signIn() {
    debugger;
    this.loading = true;

    //this.router.navigateByUrl('/dashboard');

    //http://localhost:4200
    this.authenticationService.login(this.loginForm.value).subscribe((user: any) => {

      if (user) {

        localStorage.setItem('currentUserCmx', JSON.stringify(user));
        setTimeout(() => {
          // if (user.urlSRDCode == 'B') {
          //   this.windowRefService.nativeWindow.open(user.urlSRD, '_self');
          // }
          // else if (user.urlSRDCode == 'M') {
          //   this.windowRefService.nativeWindow.open(user.urlSRD, '_blank');
            this.router.navigate(['/']);
          // }
          // else {
          //   this.router.navigateByUrl(user.urlSRD);
          // }
        }, 500);

      } else {
        this.loading = false;
      }

    }, error => {
      this._notificationService.notify('error',this._translateService.instant("CMXError.Error_002", error));
      this.loading = false;
    }
    );

  }

  onChangeRememberMe() {
    //TODO implementar
  }

  signInWithPassRenew() {
    // if (this.passRenewForm.valid) {

    //   const { cuit, passwordGroup } = this.passRenewForm.value;
    //   const user = new usuario();
    //   user.username = cuit;
    //   user.password = passwordGroup.Password;

    //   this.authenticationService.createPassword(user)
    //   .subscribe(
    //     value => {

    //       if(value){

    //         this.authenticationService.login(user)
    //         .subscribe(
    //             (val:any) => {
    //               this._notificationService.success('Acceso Correcto');
    //               localStorage.setItem('currentUserCmx', JSON.stringify(val));
    //               setTimeout(() => {
    //                 if(val.urlSRDCode == 'B'){
    //                   this.windowRefService.nativeWindow.open(val.urlSRD, '_self');
    //                 }
    //                 else if(val.urlSRDCode == 'M'){
    //                   this.windowRefService.nativeWindow.open(val.urlSRD, '_blank');
    //                   this.router.navigate(['/']);
    //                 }
    //                 else{
    //                   this.router.navigateByUrl(val.urlSRD);
    //                 }
    //               }, 1000);
    //             },
    //             error => {
    //               this._notificationService.error(error.error);
    //             }
    //           );
    //       }
    //       else{
    //         this._notificationService.error("Ocurrió un error cambiar la contraseña. Comuniquese con el administrador");
    //       }
    //     },
    //     error => {
    //         this._notificationService.error(error.error);
    //     }
    //   );

    // } else {
    //   //this.formErrors = this.formService.validateForm(this.signinForm, this.formErrors, false);
    //   //TODO agregar validador de contraseña
    // } 
  }

  onClickForgotPassword() {
    this.showForgotPassword = (this.showForgotPassword === true) ? false : true;
  }

  forgotPassword() {
    // const { cuit } = this.forgotPasswordForm.value;
    // const user = new usuario();
    // user.username = cuit;

    // this.authenticationService.forgotPassword(user)
    // .subscribe(
    //   value => {
    //     this._notificationService.info('Revise su email para finalizar el cambio.', 'Recuperación de contraseña');
    //   },
    //   error => {
    //     this._notificationService.error(error.error);
    //   }
    // );
  }


  onSettingsClose(event: boolean) {
    this.isSettings = event;

  }
  onClickRegister() {
    this.isSettings = !this.isSettings;
    
  }
}
