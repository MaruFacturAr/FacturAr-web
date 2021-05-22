import { Component, OnInit, Renderer2, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from 'app/_services/authentication.service';
import { SessionStorage } from 'ngx-webstorage';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap';
//import { ServicioMoaNoDelegadoComponent } from 'app/components/NewsComponents/servicio-moa-no-delegado/servicio-moa-no-delegado.component';
//import { ServiciosAFIPDelegadosService } from 'app/_services/serviciosAFIP.delegados.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  styleUrls: ['full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit { 
  
  @SessionStorage("CMX-CURRENT-USER")
  public usuario:any;

  bsModalRef: BsModalRef;

  constructor(private router:Router, 
              private _notificationService:SnotifyService,
              private _authenticationService: AuthenticationService,
              private _renderer: Renderer2,
              private modalService: BsModalService,
             // private _serviciosAFIPDelegadosService: ServiciosAFIPDelegadosService,
              @Inject(DOCUMENT) private _document){ }
          
  ngOnInit() {

    this._authenticationService.getFullCurrentUserInfo().subscribe((result) => {

      this.usuario = result;

      let modalOptions:ModalOptions = {
        class: "modal-lg pt-0 shadow"
      }
     });     
      
  }
  
   
}
