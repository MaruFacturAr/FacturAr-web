import { Component, AfterViewInit } from '@angular/core';
import * as $ from "jquery";
import { WindowRefService } from 'app/_services/windowRef.service';
import { AuthenticationService } from 'app/_services/authentication.service';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html'
})
export class AppSidebarComponent implements AfterViewInit {
  
  constructor(
    private windowRefService: WindowRefService,
    private _notificationService:NotifierService,
    private _authenticationService:AuthenticationService){ 

     
    }

  ngAfterViewInit(){
    $(".nav-dropdown>a").on("click", function() {
      $(this).parent().toggleClass("open");
    });
  }

 
}
