import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private URL = `http://localhost:3000/api`

  constructor(
    private http: HttpClient,
  ) { }

  getByQuery(data: any) {
    return this.http.get(`${this.URL}/posts?content=${data.query}`)
  }

  getPost(postId: any) {
    return this.http.get(`${this.URL}/posts/${postId}`);
  }

  create(data: { post: any, user: any} | FormData) {
    return this.http.post(`${this.URL}/posts`, data)
  }

  update(post: any){
    return this.http.patch(`${this.URL}/posts/${post._id}`, post)
  }

  deletePost(post:any){
    return this.http.delete(`${this.URL}/posts/${post._id}`)
  }

  quickcontact(data: any) {
    return this.http.post(`${this.URL}/mailer/quickcontact`, data)
  }
}
