import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { cleanErrors, showErrors } from 'src/helpers/form-errors';
import { serviceSchema } from './service-form.schema';

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

  constructor() {
    this.closeSubmenu()
  }

  async ngOnInit(): Promise<void>{
    await this.fetchDataServiceTypes();
    const selectServiceType = document.querySelector('#typeService') as HTMLSelectElement;
    this.serviceTypeData.forEach((serviceType:any) => {
      const option = document.createElement('option');
      option.value = serviceType.name;
      option.innerHTML = serviceType.name;
      selectServiceType?.appendChild(option);
    })
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

  submitHandler(event: Event): void {
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

      // send data to backend
      fetch('http://localhost:3000/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(result.data)
      })
        .then(response => response.json())
        .then(responseData => {
          console.log('Respuesta del servidor:', responseData);
        })
        .catch(error => {
          console.error('Error al realizar la solicitud POST:', error);
        });
    }
  }
}