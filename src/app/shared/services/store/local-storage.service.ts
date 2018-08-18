import { Injectable } from '@angular/core';

import { Store } from './store';
import { parseToObject } from '../../utils/json/parseToObject';
import { parseToJson } from '../../utils/json/parseToJson';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService<T> extends Store<T>{
  
  private static _subjects: any = {};

  protected get subjects () {
    return LocalStorageService._subjects;
  }

  protected onLoad(key: string): T {
    return parseToObject(localStorage.getItem(key));
  }

  protected onSave(key: string, value: T): void {
    localStorage.setItem(key, parseToJson(value));
  }

  protected onDelete(key: string, value: T): void {
    localStorage.removeItem(key);
  }
}
