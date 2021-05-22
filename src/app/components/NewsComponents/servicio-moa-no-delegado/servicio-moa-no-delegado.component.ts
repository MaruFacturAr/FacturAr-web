import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ServiciosAFIPDelegadosService } from 'app/_services/serviciosAFIP.delegados.service';

@Component({
  selector: 'app-servicio-moa-no-delegado',
  templateUrl: './servicio-moa-no-delegado.component.html',
  styleUrls: ['./servicio-moa-no-delegado.component.scss']
})
export class ServicioMoaNoDelegadoComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef,
              private _serviciosAFIPDelegadosService: ServiciosAFIPDelegadosService) { }

  chkNoShowAgain:boolean;
  servicioDelegado:any;
  showInstructivoAFIP:boolean;

  ngOnInit() {
    $(".overlay").hide()
  }

  closeModal(){

    if(this.chkNoShowAgain){
      this._serviciosAFIPDelegadosService.updateNoShowAgain(this.servicioDelegado).subscribe((result:any) => { }, (error) => { });
    }

    $(".overlay").show();
    this.bsModalRef.hide()
  }

  openInstructivo(){
    this.bsModalRef.setClass("modal-xl pt-0 shadow");
    this.showInstructivoAFIP = true;
  }

}
