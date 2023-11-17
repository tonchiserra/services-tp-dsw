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
    return this.http.post(`${this.URL}/users/`, user)
  }

  signIn(user: any){
    return this.http.post(`${this.URL}/users/signin`, user)
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

  updateUserToken(user: any) {
    return this.http.patch(`${this.URL}/users/${user._id}`, user)
  }

  getUserLogged() {
    return this.http.get(`${this.URL}/users/token/${this.getToken()}`)
  }

  deleteAccount() {
    this.getUserLogged().subscribe(
      async (res: any) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${res.data.token}`);
        myHeaders.append("Content-Type", "application/json");

        await fetch(`http://localhost:3000/api/users/${res.data._id}`, {
          method: 'DELETE',
          headers: myHeaders
        })

        localStorage.removeItem('services-tp-dsw-user-token')
        this.router.navigate(['/login']) 
      },
      (err: any) => {
        console.log(err)
      }
    )
  }
}
