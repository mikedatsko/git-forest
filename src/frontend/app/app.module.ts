import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent, HomeComponent, ForestComponent, CheckFormComponent, PreloaderComponent } from './components';
import { DrawTreeService, HttpService, state } from './services';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ForestComponent,
    CheckFormComponent,
    PreloaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'home/:userId',
        component: HomeComponent
      },
      {
        path: '*',
        component: HomeComponent
      }
    ])
  ],
  providers: [DrawTreeService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    state.setInitialState({
      USER_TOP: 'string',
      PRELOADER: 'boolean'
    });
  }
}
