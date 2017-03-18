import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurePageComponent } from './secure-page/secure-page.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './services/login.guard';

const routes: Routes = [
  { path: 'securepage', component: SecurePageComponent, canActivate: [LoginGuard] },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
