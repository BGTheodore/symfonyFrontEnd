import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'movies', component: MovieListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

const oktaConfig = {
  issuer: 'https://dev-33095217.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oa90f29pDmMJMvpY5d6'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
