import { Component } from '@angular/core';

// Testing HTTP calls to backend imports
import { Headers, Http, RequestOptions, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UtilityDelta Frontend Hello World!';

  constructor(private http: Http) { }

  login() {
    this.http.get(`api/login?username=admin&password=password`)
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError)
      .then((value: any) => {
        this.title = 'logged in!';
      });
  }
  logoff() {
    this.http.get(`api/logoff`)
      .toPromise()
      // .then(response => response.json() as any)
      .catch(this.handleError)
      .then(() => {
        this.title = 'logged off!';
      });
  }

  clickNavigation(someNumber: number) {
    this.clicked('values', someNumber);
  }

  public clicked(actionName: string, someNumber: number): void {
    this.title = 'Submitting query...';
    this.http.get(`api/${actionName}`)
      .toPromise()
      .then(response => response.json() as string[])
      .catch(this.handleError)
      .then((value: string[]) => {
        this.title = value[0];
      });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
