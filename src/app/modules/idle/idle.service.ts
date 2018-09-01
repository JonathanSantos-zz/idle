import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { isNullOrUndefined } from '../../shared/utils/object/isNullOrUndefined';
import { DebugMode } from './../../core/decorators/DebugMode.decorator';
import { LocalStorageService } from './../../shared/services/store/local-storage.service';
import { Action } from './models/Action.interface';
import { ActionType } from './models/ActionType.enum';


const IDLE_VALUE = 'IDLE_VALUE';

@Injectable({
  providedIn: 'root'
})
export class IdleService {

  private configuration = {
    value: {
      min: 0,
      max: Number.MAX_VALUE
    }
  };

  private value = 0;
  private idleSubscriber = new BehaviorSubject<number>(0);
  private addValues: Action[];

  constructor(
    private storageService: LocalStorageService<number>
  ) {
    storageService
      .get(IDLE_VALUE)
      .subscribe(value => {
        if (!isNullOrUndefined(value)) {
          this.value = value;
          this.emitter(value);
        }
      });
  }

  private emitter (value: number): void {
    this.idleSubscriber.next(value);
  }

  @DebugMode()
  action ( action: Action ): void {
    const { type, value } = action;
    let newValue: number;

    switch ( type ) {
      case ActionType.ADD:
        newValue = this.addValue(value);
        break;
      case ActionType.REMOVE:
        newValue = this.removeValue(value);
        break;
      default:
        throw new Error('ActionType não foi definido: ' + JSON.stringify(action));
    }

    this.value = newValue;
    this.storageService.add(IDLE_VALUE, this.value);
  }

  private removeValue (value, minValue = this.configuration.value.min): number {
    const newValue = this.value - value;
    const newValueIsLessThenMinValue = newValue < minValue;

    if (newValueIsLessThenMinValue) {
      return minValue;
    }

    return newValue;
  }

  private addValue (value, maxValue = this.configuration.value.max): number {
    const newValue = this.value + value;
    const newValueIsGreaterThenMaxValue = newValue > maxValue;

    if (newValueIsGreaterThenMaxValue) {
      return maxValue;
    }

    return newValue;
  }

  getValue (): Observable<number> {
    return this.idleSubscriber.asObservable();
  }

}
