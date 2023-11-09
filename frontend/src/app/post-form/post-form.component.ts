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
        userLogged.services.forEach(async (service: any) =>{
          console.log(service)
          await fetch('http://localhost:3000/api/services/'+  service)
          .then(res => res.json())
          .then(async response => {
            console.log(await response.data)
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
    
    const data: IPostFormData = {
      isServicePost: this.postFormState.isServicePost.value || false,
      postType: this.postFormState.service.value || '',
      content: this.postFormState.text.value || '',
      media: this.postFormState.files.value,
      date: new Date()
    }

    if(!data.content){
      console.log(data,"error")
    }else{
      this.authService.getUserLogged().subscribe(
        (res: any) => {
          let userLogged = res.data

          this.postService.create({post: data, user: userLogged}).subscribe(
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

    // enviar datos al backend
  }

}
