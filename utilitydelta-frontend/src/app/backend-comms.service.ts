import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestMethod, Request, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BackendCommsService {

  private apiRoute = 'api/';

  constructor(private http: Http) { }

/**
 * Perform a GET request to the backend API
 */
  get<T>(endPoint: string): Promise<T> {
    return this.http.get(`${this.apiRoute}${endPoint}`)
      .toPromise()
      .catch(this.handleError)
      .then(response => {
        return response.json() as T;
      });
  }

  post<T>(endPoint: string, data: any): Promise<T> {
    const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.apiRoute}${endPoint}`, body, options)
      .toPromise()
      .then(response => response.json() as T)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
