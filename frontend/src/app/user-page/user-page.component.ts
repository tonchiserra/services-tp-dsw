import { Component } from '@angular/core';

@Component({
  selector: 'user-page',
  templateUrl: './user-page.component.html'
})
export class UserPageComponent {
  constructor() {
    this.setEvents()
  }

  private setEvents() {
    document.addEventListener("DOMContentLoaded", () => {
      this.handleTabClick()
    })
  }

  private handleTabClick() {
    let tabs: HTMLElement = document.querySelector('.user-posts__tabs') as HTMLElement
    if(!tabs) return

    tabs.addEventListener("click", event => {
      let tabClicked = (event.target as HTMLElement).closest('.tab')
      if(!tabClicked) return

      Array.from(tabs.children).forEach(tab => {
        if(tab === tabClicked) tab.classList.add('active')
        else tab.classList.remove('active')

        // if dataset.tab === 'posts' => show posts
        // if dataset.tab === 'likes' => show likes
        // if dataset.tab === 'media' => show media
      })
    })
  }
}

const userPageComponent = new UserPageComponent()
