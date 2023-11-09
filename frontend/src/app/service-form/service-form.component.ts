import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { cleanErrors, showErrors } from 'src/helpers/form-errors';
import { serviceSchema } from './service-form.schema';
import { AuthService } from '../services/auth.service';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'service-form',
  templateUrl: './service-form.component.html'
})
export class ServiceFormComponent {
  serviceTypeData: any[] = [];

  serviceState = {
    type: new FormControl(''),
    price: new FormControl(),
    description: new FormControl('')
  }

  constructor(
    private authService: AuthService,
    private servicesService: ServicesService
    ) {
    this.closeSubmenu()
  }

  async ngOnInit(): Promise<void>{
    await this.fetchDataServiceTypes();
  }

  async fetchDataServiceTypes() {
    await fetch('http://localhost:3000/api/serviceTypes')
      .then(res => res.json())
      .then(async response => {
        this.serviceTypeData = await response.data;
      })
  }

  closeSubmenu() {
    let submenu = document.querySelector<HTMLElement>('.submenu')
    if(!submenu) return

    submenu.classList.remove('open')
  }

  closeServiceForm(): void {
    location.href = '/home'
  }

  async submitHandler(event: Event): Promise<void> {
    event.preventDefault()
    event.stopPropagation()
    let form = event.target as HTMLElement

    cleanErrors(form)

    let data = {
      type: this.serviceState.type.value,
      description: this.serviceState.description.value,
      price: this.serviceState.price.value
    }

    const result = serviceSchema.safeParse(data)
    if(!result.success) {
      showErrors(result.error.message, form)
    }else {
    console.log(data)
    console.log(result)
      this.authService.getUserLogged().subscribe(
        (res: any) => {
          let userLogged = res.data

          this.servicesService.create({service: result.data, user: userLogged}).subscribe(
            (res: any) => {
              console.log(res)
            },
            (err: any) => {
              console.log(err)
            }
          )
        },
        (err: any) => {
          console.log(err)
        }
      )
    }
  }

  // createService(service, userLogged) {
  //   let response = await fetch('http://localhost:3000/api/services', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(result.data)
  //   })

  //   let data = await response.json()
  //     .then(response => response.json())
  //     .then(responseData => {
  //       this.updateUserServicesList()
  //     })
  //     .catch(error => {
  //       console.error('Error al realizar la solicitud POST:', error);
  //     });
  // }
}