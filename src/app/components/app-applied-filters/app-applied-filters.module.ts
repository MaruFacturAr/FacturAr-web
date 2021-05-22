import { NgModule} from '@angular/core';
import { CommonModule } from "@angular/common";
import { AppAppliedFiltersComponent } from '../../components/app-applied-filters/app-applied-filters.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AppAppliedFiltersComponent],
  exports: [AppAppliedFiltersComponent]
})
export class AppAppliedFiltersModule {}