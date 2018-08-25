import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IdleModule } from './../idle/idle.module';
import { TestComponent } from './pages/test/test.page';
import { TestRoutingModule } from './test-routing.module';


@NgModule({
  imports: [
    CommonModule,
    TestRoutingModule,
    IdleModule
  ],
  declarations: [ TestComponent ]
})
export class TestModule { }
