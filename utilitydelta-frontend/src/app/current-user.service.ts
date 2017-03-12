import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Keeps track of who the currently logged Login
 * user is, also knows if the application is starting
 * up for the first time
 */
@Injectable()
export class CurrentUserService {
  initialApplicationStart = true;
  currentUser: string;
  isLoggedIn = false;
  redirectUrl: string;

  constructor(private router: Router) { }

/**
 * Remember that this user is now logged in,
 * and redirect to the view that the user wanted
 * to go to.
 */
  login(username: string): void {
    this.isLoggedIn = true;
    this.currentUser = username;
    if (this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
      this.redirectUrl = null;
    }
  }

/**
 * Clear out all login details and send the
 * user to the login view.
 */
  logoff(): void {
    this.isLoggedIn = false;
    this.currentUser = null;
    this.redirectUrl = null;
    this.router.navigate(['/login']);
  }

/**
 * User not logged in, send to login screen
 */
  redirectToLogin(returnToUrl: string) {
    this.redirectUrl = returnToUrl;
    this.router.navigate(['/login']);
  }
}
