import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'user-page',
  templateUrl: './user-page.component.html'
})
export class UserPageComponent {
  userLogged: any = undefined

  constructor(private authService: AuthService){

    this.authService.getUserLogged()
    .subscribe(
      async (res: any) => {
        console.log(res)
        this.userLogged = res.data
      },
      (err: any) => {
        console.log(err)
      }
    )

  }

  openEditProfileModal(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    let editProfileModal = document.querySelector<HTMLElement>('edit-profile-form')
    if(!editProfileModal) return

    editProfileModal.classList.toggle('active')
  }
}