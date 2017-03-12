import { Component, OnInit } from '@angular/core';

import { BackendCommsService } from '../backend-comms.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: string[] = [];

  constructor(private backendCommsService: BackendCommsService) { }

  ngOnInit() {
  }

  processClick() {
    this.getDataFromAPI('values');
  }

  private getDataFromAPI(actionName: string): void {
    this.backendCommsService.get<string[]>(actionName)
      .then((value: string[]) => {
        this.data = value;
      });
  }
}
