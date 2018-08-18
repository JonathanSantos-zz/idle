import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './pages/test/test.page';

@NgModule({
  imports: [
    CommonModule,
    TestRoutingModule
  ],
  declarations: [ TestComponent ]
})
export class TestModule { }
