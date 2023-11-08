import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private URL = `http://localhost:3000/api`

  constructor(
    private http: HttpClient,
  ) { }

  create(data: { service: any, user: any}) {
    return this.http.post(`${this.URL}/services`, data)
  }
}
