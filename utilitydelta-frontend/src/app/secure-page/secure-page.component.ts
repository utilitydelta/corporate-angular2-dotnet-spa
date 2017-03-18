import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/fromPromise';

import { CurrentUserService } from '../services/current-user.service';
import { BackendCommsService } from '../services/backend-comms.service';
import { SignInResult } from '../dto/sign-in-result';

@Component({
  templateUrl: './secure-page.component.html'
})
export class SecurePageComponent implements OnInit {

  constructor(
    public currentUserService: CurrentUserService,
    private backendCommsService: BackendCommsService) { }

  ngOnInit() {
  }

  logoff() {
    this.backendCommsService.post<any>('logoff', null)
      .then((result: boolean) => {
        if (result) {
          this.currentUserService.logoff();
        }
      });
  }
}
