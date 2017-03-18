import { Component, OnInit } from '@angular/core';

import { SignInResult } from '../dto/sign-in-result';
import { CurrentUserService } from '../services/current-user.service';
import { BackendCommsService } from '../services/backend-comms.service';
import { CurrentUser } from '../dto/current-user';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  currentlyLoading = true;
  data: string[] = [];

  username: string;
  password: string;
  rememberMe: boolean;
  loginClass = 'btn-primary';
  loginEnabled = true;
  loginStatus = 'Login';

  constructor(
    public currentUserService: CurrentUserService,
    private backendCommsService: BackendCommsService) { }

  ngOnInit() {
    if (this.currentUserService.initialApplicationStart) {
      this.backendCommsService
        .get('CurrentUser')
        .then((dto: CurrentUser) => {
          if (dto.username !== null) {
            this.currentUserService.login(dto.username);
          }
          this.currentlyLoading = false;
        });
    }
  }

  login() {
    this.loginStatus = 'Logging in...';
    this.loginEnabled = false;

    const data = {
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe
    };

    this.backendCommsService.post<SignInResult>('login', data)
      .catch((reason: any) => {
        const result: SignInResult = {
          succeeded: false,
          isLockedOut: false,
          isNotAllowed: false,
          requiresTwoFactor: false
        };
        return result;
      })
      .then((value: SignInResult) => {
        if (value.succeeded) {
          this.currentUserService.login(data.username);
          this.loginStatus = 'Success';
        } else {
          this.loginEnabled = true;
          this.loginClass = 'btn-danger';
          this.loginStatus = 'Login failure. Try again.';
        }
      });
  }

  getSampleDataFromBackend() {
    this.backendCommsService.get<string[]>('values')
      .then((value: string[]) => {
        this.data = value;
      });
  }
}
