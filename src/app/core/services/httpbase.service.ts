import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Utility } from '../helpers/utilities';

@Injectable()
export class HttpBaseService {

  protected convertToHttpParam(data:any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return httpParams;
  }

  protected extractData(response: Response) {
    return Utility.isValidInstance(response) ? response : {};
  }

  protected handleError(error: Response): Observable<any> {
    return observableThrowError(error || 'Server error');
  }
}
