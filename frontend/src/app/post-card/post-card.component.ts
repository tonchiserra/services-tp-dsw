import { Component, Input } from '@angular/core';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html'
})
export class PostCardComponent {
  @Input() user: any;
  @Input() post: any;
  @Input() userLogged: any;
  canDelete: boolean = false;
  iconFill: string = "#2E3A59";
  imageColor = '#f4f4f4'

  constructor(
    private postService: PostService,
    private userService: UserService
    ) {
    this.closeSubmenu()
  }

  ngOnInit() {
    let dateParsed = new Date(this.post.date)
    this.post.date = dateParsed.toLocaleString()
    if(!this.post.likes){
      this.post.likes = []
    }

    this.canDelete = this.userLogged._id === this.user._id

    if(this.post.likes.includes(this.userLogged._id)){
      this.iconFill = 'red'
    }else{
      this.iconFill = "#2E3A59"
    }

    this.imageColor = this.user.imageColor || '#f4f4f4'
  }

  closeSubmenu() {
    let submenu = document.querySelector<HTMLElement>('.submenu')
    if(!submenu) return

    submenu.classList.remove('open')
  }

  handlePopup(event: Event) {
    let post = (event.target as HTMLElement)?.closest('.like-btn')
    if(post) return

    post = (event.target as HTMLElement)?.closest('.delete-btn')
    if(post) return

    post = (event.target as HTMLElement)?.closest('.profile-information__name')
    if(post) return

    post = (event.target as HTMLElement)?.closest('.post-card')
    let postPopup = post?.parentElement?.querySelector('.post-card__popup')

    if(!postPopup) return

    postPopup.classList.toggle('hidden')
  }

  handleLike(){
    
    let idIndex = this.post.likes.indexOf(this.userLogged._id);

    if(idIndex !== -1){
      this.post.likes.splice(idIndex,1);
      this.iconFill = "#2E3A59"
    }else{
      this.post.likes.push(this.userLogged._id)
      this.iconFill = 'red'
    }

    let postUser: any

    this.userService.getUser(this.user._id).subscribe(
      async (res: any) => {
        postUser = res.data
        
        postUser.posts.forEach((post: any) => {
          if(post._id === this.post._id){
            post.likes = this.post.likes
          }
        })

        if(postUser._id === this.userLogged._id) {
          this.userLogged.posts.forEach((post: any) => {
            if(post._id === this.post._id){
              post.likes = this.post.likes
            }
          })
        }
        
        let resPostUser: any = await this.userService.update(postUser).toPromise()

        if(!!!this.userLogged.postsLiked) this.userLogged.postsLiked = []
        idIndex = this.userLogged.postsLiked.indexOf(this.post._id)
    
        if(idIndex !== -1) {
          this.userLogged.postsLiked.splice(idIndex, 1)
        }else {
          this.userLogged.postsLiked.push(this.post._id)
        }

        let resUser = await this.userService.update(this.userLogged).toPromise()
        let resPost = await this.postService.update(this.post).toPromise()
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  async handleDelete(){
    this.user.posts = this.user.posts.filter((post: any) => post._id !== this.post._id);
    console.log(this.user.posts)

    this.userService.update(this.user).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.log(err)
      }
    )

    this.postService.deletePost(this.post).subscribe(
      (res: any) => {
        location.reload()
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  async sendMail(event: MouseEvent) {
    let button: HTMLElement = event.target as HTMLElement
    button.textContent = 'Sending...'
    button.setAttribute("disabled", "true")

    try {
      let data = {
        emailSender: this.userLogged.email || '',
        nameSender: this.userLogged.name || '',
        usernameSender: this.userLogged.username || '',
        addressSender: `${ this.userLogged.city }, ${this.userLogged.province}, ${this.userLogged.country}` || '',
        emailReceiver: this.user.email || '',
        nameReceiver: this.user.name || '',
        serviceType: this.post.service.type || '',
        serviceDescription: this.post.service.description || '',
        servicePrice: this.post.service.price || '',
        postContent: this.post.content || ''
      }

      await this.postService.quickcontact(data).toPromise()

      button.textContent = 'Email sended!'
      
    } catch(err) {
      console.log(err)
    }
  }
}
