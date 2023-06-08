import { ResponseStatus } from 'src/app/enums/response-status.enum';

export interface Response {
    data: any;
    status: ResponseStatus;
    message: string;
}