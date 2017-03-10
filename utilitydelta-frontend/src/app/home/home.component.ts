import { Component, OnInit } from '@angular/core';
// Testing HTTP calls to backend imports
import { Headers, Http, RequestOptions, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: string[] = [];

  constructor(private http: Http) { }

  ngOnInit() {
  }

  clickNavigation() {
    this.clicked('values');
  }

  public clicked(actionName: string): void {

    this.http.get(`api/${actionName}`)
      .toPromise()
      .then(response => response.json() as string[])
      .catch(this.handleError)
      .then((value: string[]) => {
        this.data = value;
      });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
