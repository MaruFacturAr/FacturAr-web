import {
    Directive,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef
  } from '@angular/core';
  import { Subject } from 'rxjs';
  import { AuthenticationService } from 'app/_services/authentication.service';
  
  @Directive({
    selector: '[appHasRole], app-hasrole',
    //exportAs: 'appHasRole',
    
  })
  export class HasRoleDirective implements OnInit {    
    @Input() appHasRole: string[];  
    
    stop$ = new Subject();
    isVisible = false;
    currentUser:any;

    constructor(
      private viewContainerRef: ViewContainerRef,
      private templateRef: TemplateRef<any>,
      private authenticationService: AuthenticationService
    ) {}
  
    ngOnInit() {
      this.currentUser = this.authenticationService.getDecodedAccessToken();
      
      let roles:string[]=[this.currentUser.rol];
     
      return this.doCheckAuthorization(roles);
    }

    private doCheckAuthorization(roles: string[])
    {
      if (roles != null) {
        if(this.findEntry(roles))
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        else
          this.viewContainerRef.clear();        
      }
    }

    private findEntry(roles:string[]) : boolean {
      let hasRole: boolean = false;

      roles.forEach(userRole => {
        this.appHasRole.forEach(moduleRole => {
          if(userRole == moduleRole)
          hasRole = true;
        });
      });

      return hasRole;
    }    
  }
  