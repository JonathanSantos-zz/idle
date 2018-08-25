import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdleService } from './idle.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ IdleService ]
})
export class IdleModule { }
