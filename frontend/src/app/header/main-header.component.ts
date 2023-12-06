import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html'
})
export class MainHeaderComponent {
  constructor(private authService: AuthService){ }

  auth = this.authService
  profileURL = '/user/'
  confirmationMessage = ''
  showConfirmationModal = false
  currentConfirmationModal = ''

  ngOnInit() {
    this.authService.getUserLogged().subscribe(
      (res: any) => {
        this.profileURL = this.profileURL + res.data.username + '/posts'
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  showSubmenu(event: MouseEvent) {
    let button = (event.target as HTMLElement).closest('button')
    if(!button) return

    let submenu = button.nextElementSibling
    if(!submenu) return
    
    submenu.classList.toggle('open')
  }

  handleConfirmationModal(event: string) {
    if(event === 'logout') this.confirmationMessage = 'Are you sure you want to log out?'
    
    if(event === 'delete') this.confirmationMessage = 'Are you sure you want to delete your account?'

    if(event === 'confirmation') {
      if(this.currentConfirmationModal === 'logout') this.auth.logOut()
      if(this.currentConfirmationModal === 'delete') this.auth.deleteAccount()
    }

    this.showConfirmationModal = !this.showConfirmationModal
    this.currentConfirmationModal = event
  }


}
