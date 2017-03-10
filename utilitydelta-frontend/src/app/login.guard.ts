import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CurrentUserService } from './current-user.service';
import { Headers, Http, RequestOptions, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private http: Http, private currentUserService: CurrentUserService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.currentUserService.isLoggedIn) {
      return true;
    } else if (this.currentUserService.initialApplicationStart) {
      this.currentUserService.initialApplicationStart = false;
      // make a call to backend to get username
      return this.http.get(`api/CurrentUser`)
        .toPromise()
        .then(response => {
          return response.json() as any;
        })
        .catch(this.handleError)
        .then((value: any) => {
          if (value.username != null) {
            this.currentUserService.login(value.username);
            return true;
          } else {
            this.redirectToLogin(state.url);
            return false;
          }
        });
    } else {
      this.redirectToLogin(state.url);
      return false;
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private redirectToLogin(returnToUrl: string) {
    this.currentUserService.redirectUrl = returnToUrl;
    this.router.navigate(['/login']);
  }
}
