import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { cleanErrors, showErrors } from 'src/helpers/form-errors';
import { serviceSchema } from './service-form.schema';

@Component({
  selector: 'service-form',
  templateUrl: './service-form.component.html'
})
export class ServiceFormComponent {
  serviceState = {
    type: new FormControl(''),
    price: new FormControl(),
    description: new FormControl('')
  }

  constructor() {
    this.closeSubmenu()
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
      price: this.serviceState.price.value,
      description: this.serviceState.description.value
    }

    const result = serviceSchema.safeParse(data)
    if(!result.success) {
      showErrors(result.error.message, form)
    }else {
      console.log(result.data)

      // send data to backend
    }
  }
}