import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html'
})
export class SearchPageComponent {

  searchState: any = {}
  postsToShow: any = []
  usersToShow: any = []
  userLogged: any = {}

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private userService: UserService
  ){ }

  ngOnInit() {
    this.searchState = {
      query: new FormControl(''),
      type: new FormControl('posts')
    }

    this.getUserLogged()
  }

  async getUserLogged() {
    let response: any = await this.authService.getUserLogged().toPromise()
    
    if(response && response.data) this.userLogged = response.data
  }

  submitHandler(event: Event): void {
    event.preventDefault()
    event.stopPropagation()

    let data = {
      query: this.searchState.query.value,
      type: this.searchState.type.value
    }

    if(data.query === '') {
      this.usersToShow = []
      this.postsToShow = []

      return
    }

    if(data.type === 'users') this.getUsers(data)
    else this.getPosts(data)
  }

  async getUsers(data: {}) {
    this.usersToShow = []
    this.postsToShow = []

    let response: any = await this.userService.getByQuery(data).toPromise()

    if(response && response.data) {
      this.usersToShow = response.data
    }
  }

  async getPosts(data: {}) {
    this.usersToShow = []
    this.postsToShow = []

    let response: any = await this.postService.getByQuery(data).toPromise()
    
    if(response && response.data) {
      for (const post of response.data) {
        if(post.userId) {
          let resUser: any = await this.userService.getUser(post.userId).toPromise()
          let user = resUser.data

          this.postsToShow.push({ post: post, user: user })
        }
      }
    }
  }
}
