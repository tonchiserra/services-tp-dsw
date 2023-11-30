import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { cleanErrors, showErrors } from 'src/helpers/form-errors';
import { editProfileSchema } from './edit-profile-form.schema';

@Component({
  selector: 'edit-profile-form',
  templateUrl: './edit-profile-form.component.html'
})
export class EditProfileFormComponent {
  @Input() user: any;
  editProfileState: any = {};
  imageColor = '#f4f4f4'

  ngOnInit() {
    this.editProfileState = {
      username: new FormControl(this.user?.username || ''),
      name: new FormControl(this.user?.name || ''),
      description: new FormControl(this.user?.description || ''),
      city: new FormControl(this.user?.address?.city || ''),
      province: new FormControl(this.user?.address?.province || ''),
      country: new FormControl(this.user?.address?.country || '')
    }

    this.imageColor = this.user.imageColor || '#f4f4f4'
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
      this.updateUserData(result.data)
    }
  }

  async updateUserData(user: any) {
    try {
      let authHeader = new Headers();
      authHeader.append("Authorization", `Bearer ${this.user.token}`);
      authHeader.append("Content-Type", 'application/json')

      let addressPayload = {
        city: user.city,
        province: user.province,
        country: user.country
      }

      let responseAddress = await fetch('http://localhost:3000/api/addresses/', {
        method: 'POST',
        headers: authHeader,
        body: JSON.stringify(addressPayload)
      })

      let address = await responseAddress.json()

      let userPayload = {
        username: user.username,
        name: user.name,
        description: user.description,
        address: address.data
      }

      let responseUser = await fetch(`http://localhost:3000/api/users/${this.user._id}`, {
        method: 'PATCH',
        headers: authHeader,
        body: JSON.stringify(userPayload)
      })

      let userUpdated = await responseUser.json()

    }catch(err) {
      console.log(err)
    }
  }
}