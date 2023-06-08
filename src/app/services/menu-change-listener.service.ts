import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class MenuChangeListnerService {
    private subject = new Subject<any>();

    sendHeaderText(message: string) {
        this.subject.next({ text: message });
    }

    clearHeaderText(message: string) {
        this.subject.next({ text: message });
    }

    getHeaderText(): Observable<any> {
        return this.subject.asObservable();
    }
}