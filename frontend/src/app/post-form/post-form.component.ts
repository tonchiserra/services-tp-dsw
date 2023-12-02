import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { IPostForm, IPostFormData } from './post-form.interface';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html'
})
export class PostFormComponent {
  serviceData: any[] = [];

  postFormState: IPostForm = {
    isServicePost: new FormControl(false),
    service: new FormControl(''),
    text: new FormControl(''),
    files: new FormControl()
  };

  imageColor = "#f4f4f4"

  fileSelected: File | null = null
  photoSelected: string | ArrayBuffer = ''

  constructor(
    private authService: AuthService,
    private postService: PostService
    ) {
    this.closeSubmenu()
  }

  async ngOnInit(): Promise<void>{
    await this.fetchDataService();
  }

  async fetchDataService() {
    this.authService.getUserLogged().subscribe(
      (res: any) => {
        let userLogged = res.data
        this.imageColor = userLogged.imageColor || '#f4f4f4'

        if(!!!userLogged.services) return
        
        userLogged.services.forEach(async (service: any) =>{
          await fetch('http://localhost:3000/api/services/'+  service)
          .then(res => res.json())
          .then(async response => {
            this.serviceData.push(await response.data);
          })
        })
      }
    )
  }

  formMedias = ''

  closeSubmenu() {
    let submenu = document.querySelector<HTMLElement>('.submenu')
    if(!submenu) return

    submenu.classList.remove('open')
  }

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

    let eventTarget = event.target as any

    if (eventTarget.mediaPost && eventTarget.mediaPost.files && eventTarget.mediaPost.files[0]) {
      this.fileSelected = <File>eventTarget.mediaPost.files[0];

      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result || '';
      reader.readAsDataURL(this.fileSelected);
    }
    
    const data: IPostFormData = {
      isServicePost: this.postFormState.isServicePost.value || false,
      postType: this.postFormState.isServicePost.value ? 'service' : 'normal',
      content: this.postFormState.text.value || '',
      media: this.fileSelected,
      date: new Date(),
      service: this.serviceData.find(service => service._id === this.postFormState.service.value ) || {}
    }

    if(!data.content){
      console.log(data,"error")
    }else{
      this.authService.getUserLogged().subscribe(
        (res: any) => {
          let userLogged = res.data

          let formData = new FormData()
          formData.append('post', JSON.stringify(data))
          formData.append('user', JSON.stringify(userLogged))
          formData.append('media', this.fileSelected as Blob)

          this.postService.create(formData).subscribe(
            (res: any) => {
              location.reload()
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

}
