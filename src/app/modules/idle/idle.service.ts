import { Injectable } from '@angular/core';
import { SessionStorageService } from './../../shared/services/store/session-storage.service';
import { Action } from './models/Action.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActionType } from './models/ActionType.enum';


const IDLE_VALUE = 'IDLE_VALUE';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  private value = 0;
  private idleSubscriber = new BehaviorSubject<number>(0);

  constructor(
    private sessionStorageService: SessionStorageService<number>
  ) {
    sessionStorageService.add('IDLE_VALUE', this.value);
    sessionStorageService
      .get(IDLE_VALUE)
      .subscribe(value => {
        if (value !== null && value !== undefined) {
          this.value = value;
          this.emitter(value);
        }
      });
  }

  private emitter (value: number): void {
    this.idleSubscriber.next(value);
  }

  action ( action: Action ): void {
    const { type, value } = action;

    switch ( type ) {
      case ActionType.ADD:
        this.value += value;
        break;
      case ActionType.REMOVE:
        this.value -= value;
        break;
      default:
        throw new Error('ActionType não foi definido: ' + JSON.stringify(action));
    }

    this.sessionStorageService.add(IDLE_VALUE, this.value);
  }

  getValue (): Observable<number> {
    return this.idleSubscriber.asObservable();
  }

}
