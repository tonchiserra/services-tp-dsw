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

  ngOnInit() {
    this.authService.getUserLogged().subscribe(
      (res: any) => {
        this.profileURL += res.data._id
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
}
