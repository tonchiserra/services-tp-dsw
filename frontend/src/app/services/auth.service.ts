import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = `http://localhost:3000/api`

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  signUp(user: any){
    return this.http.post<any>(`${this.URL}/users/`, user)
  }

  signIn(user: any){
    return this.http.post<any>(`${this.URL}/users/signin`, user)
  }

  logOut(){
    localStorage.removeItem('services-tp-dsw-user-token')
    this.router.navigate(['/login'])
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('services-tp-dsw-user-token')
  }

  getToken() {
    return localStorage.getItem('services-tp-dsw-user-token')
  }
}
