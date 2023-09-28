import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { IPostForm, IPostFormData } from './post-form.interface';

@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html'
})
export class PostFormComponent {
  postFormState: IPostForm = {
    isServicePost: new FormControl(false),
    service: new FormControl(''),
    text: new FormControl(''),
    files: new FormControl()
  };

  formMedias = ''

  uploadMedia(event: MouseEvent): void {
    event.preventDefault()
    event.stopPropagation()
    
    let inputMedia = document.querySelector<HTMLElement>('.form-post input[type="file"]')
    if(!inputMedia) return

    inputMedia.click()
  }

  showMediaThumbnails(event: Event): void {
    if(!event.target) return

    let selectedFiles = (event.target as HTMLInputElement).files || []
    if(selectedFiles.length <= 0) return

    this.formMedias = ''

    for(let i=0; i < selectedFiles.length; i++) {
      let file = selectedFiles[i]

      this.formMedias += (i === selectedFiles.length-1) ? file.name : `${file.name}, `
    }
  }

  submitHandler(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    
    const data: IPostFormData = {
      isServicePost: this.postFormState.isServicePost.value || false,
      service: this.postFormState.service.value || '',
      text: this.postFormState.text.value || '',
      files: this.postFormState.files.value
    }

    console.log(data)

    // enviar datos al backend
  }

}
