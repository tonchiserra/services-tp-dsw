import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = `http://localhost:3000/api`

  constructor( 
    private http: HttpClient,
  ) { }

  getByQuery(data: any){
    return this.http.get(`${this.URL}/users?user=${data.query}`)
  }

  getUser(userId: any){
    return this.http.get(`${this.URL}/users/${userId}`);
  }

  update(user: any){
    return this.http.patch(`${this.URL}/users/${user._id}`, user);
  }
}
