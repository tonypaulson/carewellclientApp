import { EventEmitter } from '@angular/core';

export class PatientListingEventListenerService {
    public onChange: EventEmitter<PatientListingEvent> = new EventEmitter<PatientListingEvent>();

    public triggerPatientListing(patientId?: number, staffId?: number) {
        this.onChange.emit({ patientId: patientId, staffId: staffId });
    }
}

export class PatientListingEvent {
    patientId?: number;
    staffId?: number;
}