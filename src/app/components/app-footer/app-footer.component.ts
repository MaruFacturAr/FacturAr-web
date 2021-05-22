import { Component } from '@angular/core';
import { CMXConfig } from 'config/config';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})

export class AppFooterComponent { 
  year:number = new Date().getFullYear();
  ambiente:string = CMXConfig.environment.title;
}
