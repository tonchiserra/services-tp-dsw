import { Component } from '@angular/core';

@Component({
  selector: 'edit-profile-form',
  templateUrl: './edit-profile-form.component.html'
})
export class EditProfileFormComponent {
    closeEditProfileModal(event: MouseEvent) {
        event.preventDefault()
        event.stopPropagation()
    
        let editProfileModal = document.querySelector<HTMLElement>('edit-profile-form')
        if(!editProfileModal) return
    
        editProfileModal.classList.toggle('active')
    }
}