import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { LoaderState } from '../contracts/loaderState';

@Injectable()
export class LoaderService {
    // private mapSubject = new BehaviorSubject<any>(false);
    private loaderSubject = new BehaviorSubject<LoaderState>({ show: false });
    loaderState = this.loaderSubject.asObservable();
    constructor() { }
    show() {
        this.loaderSubject.next(<LoaderState>{ show: true });
    }

    hide() {
        this.loaderSubject.next(<LoaderState>{ show: false });
    }
}