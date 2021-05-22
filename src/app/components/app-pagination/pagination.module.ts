import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppPagination } from './pagination.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AppPagination],
  exports: [AppPagination]
})
export class AppPaginationModule { }