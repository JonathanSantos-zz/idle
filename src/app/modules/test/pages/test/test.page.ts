import { IdleService } from './../../../idle/idle.service';
import { Component, OnInit } from '@angular/core';
import { ActionType } from '../../../idle/models/ActionType.enum';
import { isNullOrUndefined } from '../../../../shared/utils/object/isNullOrUndefined';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.css']
})
export class TestComponent implements OnInit {

  valor = 0;
  addValue = 6.73;

  constructor(
    private idleService: IdleService
  ) {
    this.idleService
      .getValue()
      .subscribe(valor => {
        if (!isNullOrUndefined(valor)) this.valor = valor; 
      });
  }

  ngOnInit() {
  }

  add () {
    this.idleService.action({
      type: ActionType.ADD,
      value: this.addValue
    });
  }

  remove () {
    this.idleService.action({
      type: ActionType.REMOVE,
      value: this.addValue
    });
  }

}
