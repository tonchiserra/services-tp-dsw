import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { cleanErrors, showErrors } from 'src/helpers/form-errors';
import { editProfileSchema } from './edit-profile-form.schema';

@Component({
  selector: 'edit-profile-form',
  templateUrl: './edit-profile-form.component.html'
})
export class EditProfileFormComponent {
  editProfileState = {
    username: new FormControl('tonchiserra'),
    name: new FormControl('Gonzalo S'),
    description: new FormControl('Esta es una descripción de pruba nada detallada pero estoy escribiendo mucho para que sea un pooooco más larga.'),
    city: new FormControl('Rosario'),
    province: new FormControl('Santa Fe'),
    country: new FormControl('Argentina')
  }

  closeEditProfileModal(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    let editProfileModal = document.querySelector<HTMLElement>('edit-profile-form')
    if(!editProfileModal) return

    editProfileModal.classList.toggle('active')
  }

  submitHandler(event: Event): void {
    event.preventDefault()
    event.stopPropagation()
    let form = event.target as HTMLElement

    cleanErrors(form)

    let data = {
      username: this.editProfileState.username.value || '',
      name: this.editProfileState.name.value || '',
      description: this.editProfileState.description.value || '',
      city: this.editProfileState.city.value || '',
      province: this.editProfileState.province.value || '',
      country: this.editProfileState.country.value || '',
    }

    const result = editProfileSchema.safeParse(data)
    if(!result.success) {
      showErrors(result.error.message, form)
    }else {
      console.log(result.data)

      // send data to backend
    }
  }
}