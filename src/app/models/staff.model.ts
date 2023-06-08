import { Service } from './service.model';
import { StaffServiceMapping } from './staff-service.model';
import { StaffScheduleModel } from './staff-schedule.model';
import { User } from '../core/models/user.model';


export class Staff {
    id: number;
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    selected_gender: string;
    staffTitle: string;
    staffNote: string;
    services: Service[];
    updatedDate: Date;
    createdDate: Date;
    isSelected: boolean;
    user: User;
    staffServices: StaffServiceMapping[];
    staffSchedules: StaffScheduleModel[];

    constructor() {
        this.user = new User();

    }
}