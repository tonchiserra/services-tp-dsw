import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MainHeaderComponent } from './header/main-header.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PostFormComponent } from './post-form/post-form.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ServiceFormComponent } from './service-form/service-form.component';

import { UserPageModule } from './user-page/user-page.module';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'user', component: UserPageComponent },
  { path: 'new-service', component: ServiceFormComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    SearchPageComponent,
    LoginPageComponent,
    HomePageComponent,
    PostFormComponent,
    ServiceFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    UserPageModule
  ],
  exports: [
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
