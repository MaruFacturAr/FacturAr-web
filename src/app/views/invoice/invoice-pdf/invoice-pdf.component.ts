import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CMXAnimations } from 'app/_helpers/animations';
import { AuthenticationService } from 'app/_services/authentication.service';
import { RoutingState } from 'app/_services/routing.service';
import { CMXConfig } from 'config/config';
import { PDFSource } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-invoice-pdf',
  templateUrl: './invoice-pdf.component.html',
  styleUrls: ['./invoice-pdf.component.scss'],
  animations: [CMXAnimations]
})
export class InvoicePdfComponent implements OnInit {
  pdfObj: any;
  filename: any;
  constructor(
    private route: ActivatedRoute,
    private _routingService: RoutingState,
    private _authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    let  idDocumento = this.route.snapshot.paramMap.get("id");
    this.filename = 'Factura_' + idDocumento;
    this.getDocument(idDocumento);
  }

  getDocument(idDocumento) {

    let url = CMXConfig.environment.apiURL + '/facturas/create-pdf/' + idDocumento;



    let pdfObject: PDFSource = {
      url: url,
      httpHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        Authorization: `Bearer ${this._authenticationService.getToken()}`
      }
    };

    this.pdfObj = pdfObject;
  }
}
