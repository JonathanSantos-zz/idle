import { Injectable } from '@angular/core';

import { Store } from './store';
import { parseToObject } from '../../utils/json/parseToObject';
import { parseToJson } from '../../utils/json/parseToJson';


@Injectable({
  providedIn: 'root'
})
export class SessionStorageService<T> extends Store<T> {

  private static _subjects: any = {};

  protected get subjects () {
    return SessionStorageService._subjects;
  }

  protected onLoad(key: string): T {
    return parseToObject(sessionStorage.getItem(key));
  }

  protected onSave(key: string, value: T): void {
    sessionStorage.setItem(key, parseToJson(value));
  }

  protected onDelete(key: string, value: T): void {
    sessionStorage.removeItem(key);
  }
}
