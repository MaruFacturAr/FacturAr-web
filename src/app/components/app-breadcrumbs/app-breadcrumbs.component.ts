

import {filter} from 'rxjs/operators';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-breadcrumbs',
  template: `
  <ng-template ngFor let-breadcrumb [ngForOf]="breadcrumbs" let-last = last>
    <li class="breadcrumb-item"
        *ngIf="breadcrumb.label && breadcrumb.url.substring(breadcrumb.url.length-1) == '/' || breadcrumb.label"
        [ngClass]="{active: (last || !breadcrumb.renderLink)}">
      
        <a *ngIf="!last" [routerLink]="breadcrumb.url">{{breadcrumb.label}}</a>
        <span *ngIf="last">{{breadcrumb.label }}</span>
    </li>
    
  </ng-template>`
})
export class AppBreadcrumbsComponent {
  breadcrumbs: Array<any>;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event) => {
      this.breadcrumbs = [];
      let currentRoute = this.route.root,
      url = ''
      do {
        const childrenRoutes = currentRoute.children;
        currentRoute = null;
        // tslint:disable-next-line:no-shadowed-variable
        childrenRoutes.forEach(route => {
          if (route.outlet === 'primary') {
            const routeSnapshot = route.snapshot;
            url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');

            if(this.breadcrumbs.length == 0 || this.breadcrumbs[this.breadcrumbs.length-1].label != route.snapshot.data.title){
              
              const id = route.snapshot.paramMap.get("id");
              let title:string;

              if(id){
                if(this.breadcrumbs[this.breadcrumbs.length-1].label != id){
                  title = route.snapshot.data.title + " " + id;  
                } else {
                  title = route.snapshot.data.title
                }
              } else {
                title = route.snapshot.data.title;
              }

              if(title){
                this.breadcrumbs.push({
                  label: title.trim(),
                  url:   url
                });
              }
            }
            
            currentRoute = route;
          }
        });
      } while (currentRoute);
    });
  }
}

