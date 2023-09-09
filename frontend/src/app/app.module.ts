import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { MainHeaderComponent } from './header/main-header.component';
import { PostCardComponent } from './post-card/post-card.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PostFormComponent } from './post-form/post-form.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'user', component: UserPageComponent },
  { path: 'user/posts', component: UserPageComponent },
  { path: 'user/likes', component: UserPageComponent },
  { path: 'user/media', component: UserPageComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    SearchPageComponent,
    UserPageComponent,
    PostCardComponent,
    LoginPageComponent,
    HomePageComponent,
    PostFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
