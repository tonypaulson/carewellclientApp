import { DurationModel } from './duration.model';

export class Service {
    id: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    createdDate: Date;
    updatedDate: Date;
    durationId: number;
    selected_durationId: string;
    isSelected: boolean;
    duration: DurationModel
}
