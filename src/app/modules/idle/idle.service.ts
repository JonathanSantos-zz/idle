import { Injectable } from '@angular/core';
import { SessionStorageService } from './../../shared/services/store/session-storage.service';
import { Action } from './models/Action.interface';


@Injectable({
  providedIn: 'root'
})
export class IdleService {
  private value = 0;

  constructor(
    private sessionStorageService: SessionStorageService<number>
  ) { }

  action ( action: Action ): void {
    
  }

}
