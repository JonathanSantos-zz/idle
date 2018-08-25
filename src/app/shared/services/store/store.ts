import { BehaviorSubject, Observable } from "rxjs";

import { isNullOrUndefined } from "../../utils/object/isNullOrUndefined";


export abstract class Store<T> {

    protected abstract get subjects ();
    protected abstract onSave(key: string, value: T): void;
    protected abstract onDelete(key: string, value: T): void;
    protected abstract onLoad(key: string): T;
    protected onGet(key: string): void { }

    protected hasSubject (key: string): boolean {
        return !isNullOrUndefined(this.subjects[key]);
    }

    protected getSubject (key: string, defaultValue: T = null): BehaviorSubject<T> {
        if (!this.hasSubject(key)) {
            const value = this.onLoad(key);

            if (!isNullOrUndefined(value)) {
                defaultValue = value;
            }

            this.subjects[key] = new BehaviorSubject<T>(defaultValue);
        }

        return this.subjects[key];
    }

    protected emitter (key: string, value: T): void {
        if (this.hasSubject(key)) {
            this.getSubject(key).next(value);
        }
    }

    add (key: string, value: T): void {
        this.onSave(key, value);
        this.emitter(key, value);
    }

    get (key: string): Observable<T> {
        this.onGet(key);
        return this.getSubject(key).asObservable();
    }

    remove (key: string): void {
        this.onDelete(key, null);
        this.emitter(key, null);
    }

}
