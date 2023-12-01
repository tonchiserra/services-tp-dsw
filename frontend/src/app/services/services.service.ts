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

  update(data:{ service: any, user: any}, _id:any) {
    return this.http.patch(`${this.URL}/services/${_id}`, data)
  }

  delete(_id:any){
    return this.http.delete(`${this.URL}/services/${_id}`)
  }
}
