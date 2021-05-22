import { NgModule} from '@angular/core';
import { CommonModule } from "@angular/common";
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppModalComponent } from '../../components/app-modal/app-modal.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [AppModalComponent],
  exports: [AppModalComponent],
  entryComponents: [
    AppModalComponent
  ],
providers: [BsModalRef]
})
export class AppModalModule {}