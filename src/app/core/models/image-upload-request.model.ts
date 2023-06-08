import { ImageUploadRequestSource } from '../enums/image-upload-request-source.enum';

export class ImageUploadRequest {
    imageUploadRequestSource: ImageUploadRequestSource;
    imgSource: string;
    imageChangedEvent: any;
    dataSource: any;
    imageFile: string;
}