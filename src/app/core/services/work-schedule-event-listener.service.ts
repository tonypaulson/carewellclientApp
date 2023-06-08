import { EventEmitter } from '@angular/core';

export class WorkScheduleEventListenerService {
    public onChange: EventEmitter<WorkScheduleEvent> = new EventEmitter<WorkScheduleEvent>();

    public triggerWorkSchedule(staffId?: number) {
        this.onChange.emit({ staffId: staffId });
    }
}

export class WorkScheduleEvent {
    staffId?: number;
}