import { Component, OnInit, ViewChild} from '@angular/core';
import { CMXAnimations } from 'app/_helpers/animations';
import { AuthenticationService } from 'app/_services/authentication.service';
//import { DashboardPasosFronterizos } from 'app/_models/Dashboard/dashboard.pasosFronterizos.model';
//import { DashboardHorarioBuques } from 'app/_models/Dashboard/dashboard.horarioBuques.model';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [CMXAnimations]
})

export class DashboardComponent implements OnInit {

  constructor(private _authenticationService: AuthenticationService,
              private deviceService: DeviceDetectorService){ 
               // this.pasosFronterizos = new DashboardPasosFronterizos();
                //this.horarioBuques = new DashboardHorarioBuques();
              }
  
    currentUser:any;
  
   // pasosFronterizos:DashboardPasosFronterizos;
    //horarioBuques:DashboardHorarioBuques;


    ngOnInit() {

      this.currentUser = this._authenticationService.getDecodedAccessToken();

      //this.pasosFronterizos.show =        true;
      //this.horarioBuques.show =           true;
    }

    private verificarRoles(roles:any):boolean {
     // let patentes = this.currentUser.pat;
      let policies =[];
    //   for (let i in patentes) {
    //     policies.push(patentes[i]);
    // }
    
      policies.push(this.currentUser.rol);
 
      return roles.some((item) => { return policies.some((p) => { return item == p }) });
    }

 }