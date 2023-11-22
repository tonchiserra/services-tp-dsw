import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html'
})
export class PostCardComponent implements AfterViewInit {
  @Input() user: any;
  @Input() post: any;
  @Input() userLogged: any;
  canDelete: boolean = false;
  iconFill: string = "#2E3A59";


  @ViewChild('postText', { static: false }) postText!: ElementRef;

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
  }

  ngAfterViewInit() {
    this.postText.nativeElement.addEventListener("click", this.handlePopup)
  }

  closeSubmenu() {
    let submenu = document.querySelector<HTMLElement>('.submenu')
    if(!submenu) return

    submenu.classList.remove('open')
  }

  handlePopup(event: Event) {
    let post = (event.target as HTMLElement)?.closest('.post-card')
    let postPopup = post?.parentElement?.querySelector('.post-card__popup')

    if(!postPopup) return

    postPopup.classList.toggle('hidden')
  }

  handleLike(){
    
    let idIndex = this.post.likes.indexOf(this.userLogged._id);
    let postUser: any;

    if(idIndex !== -1){
      this.post.likes.splice(idIndex,1);
      this.iconFill = "#2E3A59"
    }else{
      this.post.likes.push(this.userLogged._id);
      this.iconFill = 'red'
    }

    this.userService.getUser(this.user._id).subscribe(
      (res: any) => {
        postUser = res.data;
        
        postUser.posts.forEach((post: any) => {
          if(post._id === this.post._id){
            post.likes = this.post.likes;
          }
        });
        
        this.userService.update(postUser).subscribe(
          (res: any) => {
            //console.log(res);
          },
          (err: any) => {
            console.log(err)
          }
        )
      },
      (err: any) => {
        console.log(err);
      }
    )

    this.postService.updateLikes(this.post).subscribe(
      (res: any) => {
        //console.log(res);
      },
      (err: any) => {
        console.log(err)
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
}
