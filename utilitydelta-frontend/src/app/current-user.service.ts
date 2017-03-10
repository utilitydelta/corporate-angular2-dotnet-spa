import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class CurrentUserService {
  initialApplicationStart = true;
  currentUser: string;
  isLoggedIn = false;
  redirectUrl: string;

  constructor(private router: Router) { }

  login(username: string): void {
    this.isLoggedIn = true;
    this.currentUser = username;
    if (this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
      this.redirectUrl = null;
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.redirectUrl = null;
    this.router.navigate(['/login']);
  }
}
