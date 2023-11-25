import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'user-page',
  templateUrl: './user-page.component.html'
})
export class UserPageComponent {
  userLogged: any = undefined
  user: any = undefined
  postsToShow: any = []

  userPostsURL = '/user/'
  userLikesURL = '/user/'
  userMediaURL = '/user/'

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private postService: PostService,
    private userService: UserService
  ){ }

  ngOnInit() {
    this.getUserLogged()
    this.setFollowEvent()
  }

  setFollowEvent() {
    document.addEventListener("click", async (event) => {
      let followBtn = (event.target as HTMLElement)?.closest('#follow-btn')
      if(!followBtn) return

      try {
        let authHeader = new Headers();
        authHeader.append("Authorization", `Bearer ${this.userLogged.token}`);
        authHeader.append("Content-Type", 'application/json')
  
        if(this.userLogged.follows) {
          if(this.userLogged.follows.includes(this.user._id)) {
            this.userLogged.follows = this.userLogged.follows.filter((follow: string) => follow !== this.user._id)
          } else {
            this.userLogged.follows.push(this.user._id)
          }
        } else {
          this.userLogged.follows = [this.user._id]
        }

        let responseUserLogged = await fetch(`http://localhost:3000/api/users/${this.userLogged._id}`, {
          method: 'PATCH',
          headers: authHeader,
          body: JSON.stringify({ follows: this.userLogged.follows })
        })

        if(this.user.followers) {
          if(this.user.followers.includes(this.userLogged._id)) {
            this.user.followers = this.user.followers.filter((follower: string) => follower !== this.userLogged._id)
          } else {
            this.user.followers.push(this.userLogged._id)
          }
        } else {
          this.user.followers = [this.userLogged._id]
        }

        let responseUser = await fetch(`http://localhost:3000/api/users/${this.user._id}`, {
          method: 'PATCH',
          headers: authHeader,
          body: JSON.stringify({ followers: this.user.followers })
        })

      } catch(err) {
        console.log(err)
      }
    })
  }

  getUserLogged() {
    this.authService.getUserLogged()
    .subscribe(
      async (res: any) => {
        this.userLogged = res.data

        this.route.params.subscribe(params => {
          let id = params['id']

          this.userPostsURL += `${id}/posts`
          this.userLikesURL += `${id}/likes`
          this.userMediaURL += `${id}/media`

          this.getUserProfileData(id)
        })
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  async getUserProfileData(id: string) {
    try {

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${this.userLogged.token}`);
      
      let response = await fetch(`http://localhost:3000/api/users/${id}`, {
        headers: myHeaders
      })

      let { data } = await response.json()
      this.user = data

      this.getPostsToShow()

    } catch(error) {
      console.log(error)
    }
  }

  async getPostsToShow() {
    if (location.pathname.includes('/posts')) {
      this.postsToShow = [
        ...this.user.posts.map((post: any) => {
          return { user: this.user, post: post }
        })
      ]
    }

    if (location.pathname.includes('/likes')) {
      this.postsToShow = []

      if(!!this.user.postsLiked && this.user.postsLiked.length > 0) {
        for (const postLiked of this.user.postsLiked) {
          try {
            let res: any
  
            res = await this.postService.getPost(postLiked).toPromise()
            let post = res.data
  
            res = await this.userService.getUser(post.userId).toPromise()
            let user = res.data
            
            this.postsToShow.push({ user: user, post: post })
          } catch (err) {
            console.log(err)
          }
        }
      }
    }    

    if (location.pathname.includes('/media')) {
      // to-do
    }
  }

  openEditProfileModal(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    let editProfileModal = document.querySelector<HTMLElement>('edit-profile-form')
    if(!editProfileModal) return

    editProfileModal.classList.toggle('active')
  }
}