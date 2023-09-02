import { Component } from '@angular/core';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  private signUpContainer: HTMLElement | null
  private signInContainer: HTMLElement | null

  constructor() {
    this.setEvents()
    this.signInContainer = null
    this.signUpContainer = null
  }

  private setEvents(): void {
    document.addEventListener("DOMContentLoaded", () => {
      if (location.pathname !== '/login') return 

      this.signUpContainer = document.querySelector('#sign-up') as HTMLElement
      this.signInContainer = document.querySelector('#sign-in') as HTMLElement

      if(this.signUpContainer && location.hash === '#sign-up') {
        this.signUpContainer.classList.remove('hidden')
      }else this.signUpContainer.classList.add('hidden')

      if(this.signInContainer && (location.hash === '#sign-in' || location.hash === '')) {
        this.signInContainer.classList.remove('hidden')
      }else this.signInContainer.classList.add('hidden')
    })
  }
}

const loginPageComponent = new LoginPageComponent()
