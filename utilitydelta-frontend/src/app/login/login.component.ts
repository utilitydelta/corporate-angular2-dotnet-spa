import { Component, OnInit } from '@angular/core';
// Testing HTTP calls to backend imports
import { Headers, Http, RequestOptions, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = '';

  constructor(private http: Http) { }

  ngOnInit() {
  }

  login() {
    const body = JSON.stringify(
      {
        Username: 'admin',
        Password: 'password'
      });
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    this.http.post('api/login', body, options)
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError)
      .then((value: any) => {
        this.title = 'logged in!';
      });
  }
  logoff() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    this.http.post('api/logoff', null, options)
      .toPromise()
      // .then(response => response.json() as any)
      .catch(this.handleError)
      .then(() => {
        this.title = 'logged off!';
      });
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
