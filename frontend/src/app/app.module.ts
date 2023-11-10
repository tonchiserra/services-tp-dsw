import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MainHeaderComponent } from './header/main-header.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PostFormComponent } from './post-form/post-form.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ServiceFormComponent } from './service-form/service-form.component';

import { UserPageModule } from './user-page/user-page.module';

import { authGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [authGuard]},
  { path: '', component: HomePageComponent, canActivate: [authGuard] },
  { path: 'home', component: HomePageComponent, canActivate: [authGuard] },
  { path: 'search', component: SearchPageComponent, canActivate: [authGuard] },
  { path: 'user/:id', component: UserPageComponent, canActivate: [authGuard] },
  { path: 'new-service', component: ServiceFormComponent, canActivate: [authGuard] }
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
    UserPageModule,
    HttpClientModule
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
