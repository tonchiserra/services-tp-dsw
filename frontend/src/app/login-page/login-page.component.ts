import { Component } from '@angular/core';
import { FormControl } from '@angular/forms'
import { signUpPasswordSchema, signInSchema } from './login-page.schema';
import { showErrors, cleanErrors } from 'src/helpers/form-errors';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    private authService: AuthService,
    private router: Router
    ) {

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
    this.authService.signUp(userData)
      .subscribe(
        async (res: any) => {
            localStorage.setItem('services-tp-dsw-user-token', res.token)
            await this.updateUserToken(res.data, res.token)
            this.router.navigate(['/'])
        },
        (err: any) => {
          console.log(err)
          if(err.error.message.includes('Username')){
            document.getElementsByClassName("usernameError")[0].textContent = "Username already in use"
          }
          if(err.error.message.includes('Email')){
            document.getElementsByClassName("emailError")[0].textContent = "Email already in use"
          }
        }
      )
  }

  private async signIn(userData: {email: string, password: string}, form: HTMLElement) {
    this.authService.signIn(userData)
      .subscribe(
        async (res: any) => {
          localStorage.setItem('services-tp-dsw-user-token', res.token)
          await this.updateUserToken(res.data, res.token)
          this.router.navigate(['/'])
        },
        (err: any) => {
          console.log(err)
          showErrors(err.statusText, form)
        }
      )
  }

  private async updateUserToken(user: any, token: string) {
    user.token = token
    this.authService.updateUserToken(user)
    .subscribe(
      (res: any) => {
        console.log(res)
      },
      (err: any) => {
        console.log(err)
      }
    )
  }
}