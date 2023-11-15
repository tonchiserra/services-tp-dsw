import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  userLogged: any = undefined
  postsToShow: any = undefined

  constructor(private authService: AuthService) {
    this.setEvents()
  }

  ngOnInit() {
    this.getUserLogged()
  }

  private setEvents(): void {
    document.addEventListener("DOMContentLoaded", () => {
      let textarea = document.querySelector('textarea#textPost') as HTMLElement
      if(!textarea) return

      textarea.focus()
    })
  }

  getUserLogged() {
    this.authService.getUserLogged()
    .subscribe(
      (res: any) => {
        this.userLogged = res.data

        this.getPostsToShow()
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  async getPostsToShow() {
    this.postsToShow = [
      ...this.userLogged.posts.map((post: any) => {
        return { user: this.userLogged, post: post }
      })
    ]

    for (const follow of this.userLogged.follows) {
      await this.getFollowData(follow);
    }

    console.log(this.postsToShow)
  }

  async getFollowData(id: string) {
    try {

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${this.userLogged.token}`);
      
      let response = await fetch(`http://localhost:3000/api/users/${id}`, {
        headers: myHeaders
      })

      let { data } = await response.json()
      let user = data


      let userPosts = [...user.posts.map((post: any) => {
        return { user: user, post: post }
      })]

      this.postsToShow = [...this.postsToShow, ...userPosts]

    } catch(error) {
      console.log(error)
    }
  }
}