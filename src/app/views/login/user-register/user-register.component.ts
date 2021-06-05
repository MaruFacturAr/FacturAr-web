import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import {  NgxAsideComponent} from 'app/components/advanced/aside/aside.component'
import { Address } from 'app/_models/address.model';
import { Phone } from 'app/_models/phone.model';
import { ProvinceModel } from 'app/_models/province.model';
import { User } from 'app/_models/user.model';
import { ProvinceService } from 'app/_services/province.service';
import { UsuarioService } from 'app/_services/usuario.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  isOpen = false;
  isChecked = false;
  provinces=new Array<ProvinceModel>();
  @ViewChild('settings', { static: true}) settings: NgxAsideComponent;

  @Input('open') set open(value: boolean) {
    this.isOpen = value;
    if (this.isOpen) {
      this.settings.show();
    }
  }

  CMXFormGroup = new FormGroup({
 
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(200)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(120), Validators.pattern(new RegExp(/^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/))]),
    country_code: new FormControl('',  [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    city_code: new FormControl('', [Validators.required, Validators.pattern(new RegExp(/^\d+$/))]),
    number: new FormControl(0, [Validators.required, Validators.pattern(new RegExp(/^\d+$/))]),
    extension: new FormControl(0, [Validators.required, Validators.pattern(new RegExp(/^\d+$/))]),
    street: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]),
    city: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    province: new FormControl('', Validators.required),

  });
   constructor(private _provinceService:ProvinceService, 
    private _notificationService:NotifierService,
    private _usuarioService:UsuarioService ) {
      if(this.provinces.length == 0)
      this._provinceService.getAll().subscribe((result) =>{
        this.provinces = result;
      });
    }

  ngOnInit() {
  }
  
  get open() {
    return this.isOpen;
  }

  @Output() close = new EventEmitter<boolean>();

  name = 'Angular';

  onChange(){
    this.isChecked = !this.isChecked;
  }

  onClose() {
    this.isOpen = !this.isOpen;
    this.isChecked = false;
    this.CMXFormGroup.reset();
    this.settings.hide()
    this.close.emit(this.isOpen)
  }
  createUser():User{
    let user = new User();
    user.id = 0;
    user.name = this.CMXFormGroup.get("name").value;
    user.last_name = this.CMXFormGroup.get("last_name").value;
    user.userName = this.CMXFormGroup.get("username").value;
    user.email = this.CMXFormGroup.get("email").value;
    user.password = this.CMXFormGroup.get("password").value;
    user.status_id = 1;
    user.created_date = new Date();
    user.modified_date = new Date();
    user.address = new Address();
    user.address.address_type_id = 1;
    user.address.country_id=61;
    user.address.city = this.CMXFormGroup.get("city").value;
    user.address.street = this.CMXFormGroup.get("street").value;
    user.address.id = 0;
    user.address.province_id = this.CMXFormGroup.get("province").value;
    user.phone = new Phone();
    user.phone.id = 0;
    user.phone.phone_type_id = 1;
    user.phone.city_code = this.CMXFormGroup.get("city_code").value;
    user.phone.country_code = this.CMXFormGroup.get("country_code").value;
    user.phone.extension = this.CMXFormGroup.get("extension").value;
    user.phone.number = this.CMXFormGroup.get("number").value;

    return user;
  }
  onSave(){
    let newUser = this.createUser();
    this._usuarioService.register(newUser).subscribe((result) =>
    { 
      this._notificationService.notify('default', 'Felicitaciones! ya estas registrado');
      this.onClose();
    }, error => { 
      
      this._notificationService.notify('error', 'Hubo un error');
    });
    
  }
}
