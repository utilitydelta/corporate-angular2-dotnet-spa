import { Component, OnInit } from '@angular/core';

import { CurrentUserService } from '../current-user.service';
import { BackendCommsService } from '../backend-comms.service';
import { SignInResult } from '../BackendDto/SignInResult';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = '';

  constructor(
    private currentUserService: CurrentUserService,
    private backendCommsService: BackendCommsService) { }

  ngOnInit() {
  }

  login() {
    const data = {
      username: 'admin',
      password: 'password'
    };
    this.backendCommsService.post<SignInResult>('login', data)
      .then((value: SignInResult) => {
        if (value.succeeded) {
          this.currentUserService.login(data.username);
          this.title = `logged in as ${data.username}.`;
        } else {
          this.title = `Failed to log in.`;
        }
      });
  }

  logoff() {
    this.backendCommsService.post<any>('logoff', null)
      .then((result: boolean) => {
        if (result) {
          this.currentUserService.logoff();
          this.title = 'Logged off.';
        } else {
          this.title = 'Failed to log off';
        }
      });
  }
}
