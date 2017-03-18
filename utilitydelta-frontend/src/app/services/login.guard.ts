import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CurrentUserService } from './current-user.service';
import { CurrentUser } from '../dto/current-user';
import { BackendCommsService } from './backend-comms.service';

/**
 * Ensure the user cannot navigate to any routes with
 * this guard if they haven't logged in. The guard will
 * instead send the user to the login screen.
 */
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private backendCommsService: BackendCommsService,
    private currentUserService: CurrentUserService) {

  }

  /**
   * The application has just loaded. The user may
   * have still be logged in - so check the backend first
   */
  private checkIfLoggedIn(currentUrl: string): Promise<boolean> {
    this.currentUserService.initialApplicationStart = false;
    return this.backendCommsService
      .get('CurrentUser')
      .then((value: CurrentUser) => {
        return this.processCurrentUser(value, currentUrl);
      });
  }

  /**
   * We just received a user object from the backend.
   * Check the login status and redirect if required.
   */
  private processCurrentUser(dto: CurrentUser, currentUrl: string): boolean {
    if (dto.username != null) {
      this.currentUserService.login(dto.username);
      return true;
    } else {
      this.currentUserService.redirectToLogin(currentUrl);
      return false;
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.currentUserService.isLoggedIn) {
      return true;
    }

    if (this.currentUserService.initialApplicationStart) {
      return this.checkIfLoggedIn(state.url);
    }

    this.currentUserService.redirectToLogin(state.url);
    return false;
  }
}
