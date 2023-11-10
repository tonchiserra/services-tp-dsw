import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html'
})
export class PostCardComponent implements AfterViewInit {
  @Input() user: any;
  @Input() post: any;

  @ViewChild('postCard', { static: false }) postCard!: ElementRef;

  ngOnInit() {
    let dateParsed = new Date(this.post.date)
    this.post.date = dateParsed.toLocaleString()
  }

  ngAfterViewInit() {
    this.postCard.nativeElement.addEventListener("click", this.handlePopup)
  }

  handlePopup(event: Event) {
    let post = (event.target as HTMLElement)?.closest('.post-card')
    let postPopup = post?.parentElement?.querySelector('.post-card__popup')

    if(!postPopup) return

    postPopup.classList.toggle('hidden')
  }
}
