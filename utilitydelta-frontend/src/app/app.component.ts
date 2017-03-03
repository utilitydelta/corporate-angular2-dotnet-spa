import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UtilityDelta Frontend Hello World!';

  clickNavigation() {
    this.title = "Navigation clicked";
  }
}
