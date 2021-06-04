import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppPdfViewerComponent } from './app-pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { WindowRefService } from '../../../_services/windowRef.service';
import { FormsModule } from '@angular/forms';
import { AppPaginationModule } from 'app/components/app-pagination/pagination.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'app/_helpers/jwt.interceptor';


@NgModule({
  imports: [
    CommonModule, 
    BsDropdownModule.forRoot(), 
    TooltipModule.forRoot(),
    PdfViewerModule, 
    FormsModule, 
    AppPaginationModule
  ],
  exports: [AppPdfViewerComponent],
  declarations: [ AppPdfViewerComponent],
  entryComponents: [
    AppPdfViewerComponent
  ],
  providers: [ WindowRefService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } ]

})
export class AppPdfViewerModule { }
