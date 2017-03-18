import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecurePageComponent } from './secure-page/secure-page.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './services/login.guard';
import { CurrentUserService } from './services/current-user.service';
import { BackendCommsService } from './services/backend-comms.service';

@NgModule({
  declarations: [
    AppComponent,
    SecurePageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    LoginGuard,
    CurrentUserService,
    BackendCommsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
