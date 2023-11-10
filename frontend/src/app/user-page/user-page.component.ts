import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-page',
  templateUrl: './user-page.component.html'
})
export class UserPageComponent {
  userLogged: any = undefined
  user: any = undefined

  userPostsURL = '/user/'
  userLikesURL = '/user/'
  userMediaURL = '/user/'

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ){ }

  ngOnInit() {
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

    } catch(error) {
      console.log(error)
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