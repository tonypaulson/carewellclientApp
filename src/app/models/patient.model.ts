import { Sex } from '../enums/sex.enum';
import { DropDownItems } from './dropdown-items.model';
import { User } from '../core/models/user.model';

export class Patient {
    id: number;
    fullName: string;
    address: string;
    city: string;
    state: string;
    patientNote: string;
    dateOfBirth?: Date;
    selected_gender: string;
    createdDate: Date;
    updatedDate: Date;
    zipCode: string;
    isSelected: boolean;
    birthMonth: string;
    birthDay: string;
    birthYear: string;
    dobString: string;
    user: User;

    constructor() {
        this.user = new User();
    }
}