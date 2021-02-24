import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';
import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpModule } from '@angular/http';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'movies', component: MovieListComponent },
  { path: 'implicit/callback', component: OktaCallbackComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

const oktaConfig = {
  issuer: 'https://dev-33095217.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oa90f29pDmMJMvpY5d6'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    OktaAuthModule.initAuth(oktaConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppComponent {

  isAuthenticated: boolean;

  constructor(public oktaAuth: OktaAuthService) {
      this.oktaAuth.$authenticationState.subscribe(
          (isAuthenticated: boolean) => (this.isAuthenticated = isAuthenticated)
      );
  }

  async ngOnInit() {
      this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  login() {
      this.oktaAuth.loginRedirect('/');
  }

  logout() {
      this.oktaAuth.logout('/');
  }
}

export class AppModule { }