import { Component } from '@angular/core';
import { FormControl } from '@angular/forms'
import { signUpPasswordSchema, signInSchema } from './login-page.schema';
import { showErrors, cleanErrors } from 'src/helpers/form-errors';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  private signUpContainer: HTMLElement | null = null
  private signInContainer: HTMLElement | null = null
  
  signUpFormState = {
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordRepeat: new FormControl('')
  }

  signInFormState = {
    email: new FormControl(''),
    password: new FormControl('')
  }

  constructor() {
    this.setEvents()
  }

  private setEvents(): void {
    document.addEventListener("DOMContentLoaded", () => this.handleFormToShow())
  }

  private handleFormToShow() {
    if (location.pathname !== '/login') return 

    this.signUpContainer = document.querySelector('#sign-up') as HTMLElement
    this.signInContainer = document.querySelector('#sign-in') as HTMLElement

    if(this.signUpContainer && location.hash === '#sign-up') this.signUpContainer.classList.remove('hidden')
    else this.signUpContainer.classList.add('hidden')

    if(this.signInContainer && (location.hash === '#sign-in' || location.hash === '')) this.signInContainer.classList.remove('hidden')
    else this.signInContainer.classList.add('hidden')
  }

  submitHandler(event: Event): void {
    event.preventDefault()
    event.stopPropagation()
    let form = event.target as HTMLElement

    cleanErrors(form)

    if(form.id === 'SignUpForm') {
      let data = {
        name: this.signUpFormState.name.value || '',
        username: this.signUpFormState.username.value ?? '',
        email: this.signUpFormState.email.value ?? '',
        password: this.signUpFormState.password.value ?? '',
        passwordRepeat: this.signUpFormState.passwordRepeat.value ?? ''
      }
      
      const result = this.getSignUpErrors(data)
      if(!result.success) {
        showErrors(result.error.message, form)
      }else {
        this.signUp(result.data, form)
      }
    }

    if(form.id === 'SignInForm') {
      let data = {
        email: this.signInFormState.email.value || '',
        password: this.signInFormState.password.value || ''
      }

      const result = this.getSignInErrors(data)
      if(!result.success) {
        showErrors(result.error.message, form)
      }else {
        this.signIn(result.data, form)
      }
    }

  }

  private getSignUpErrors(data: any) {
    return signUpPasswordSchema.safeParse(data)
  }

  private getSignInErrors(data: any) {
    return signInSchema.safeParse(data)
  }

  private async signUp(userData: any, form: HTMLElement) {
    try {
      let response = await fetch(`http://localhost:3000/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      let userRegistered = await response.json()

      if(!response.ok) {
        throw {
          status: response.status,
          statusText: response.statusText,
          message: `[{
            "validation": "email",
            "code": "invalid_string",
            "message": "Try again later",
            "path": ["email"]
          }]`
        }
      }

      console.log(userRegistered)

    } catch(error: any) {
      console.error(error)

      showErrors(error.message, form)
    }
  
  }

  private async signIn(userData: {email: string, password: string}, form: HTMLElement) {
    try {
      let response = await fetch(`http://localhost:3000/api/users/${userData.email}/${userData.password}`)
      let userLogged = await response.json()

      if(!response.ok) {
        throw {
          status: response.status,
          statusText: response.statusText,
          message: `[{
            "validation": "email",
            "code": "invalid_string",
            "message": "Wrong email or password",
            "path": ["email"]
          }]`
        }
      }

      console.log(userLogged)

    } catch(error: any) {
      console.error(error)

      showErrors(error.message, form)
    }
  
  }
}