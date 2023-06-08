import { Service } from './service.model';

export class Category {
    id: number;
    name: string;
    description: string;
    createdDate: Date;
    updatedDate: Date;
    isSelected: boolean;
    categoryIndex: number;
    services : Service[];
}
