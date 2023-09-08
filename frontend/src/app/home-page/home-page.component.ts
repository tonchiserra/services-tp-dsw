import { Component } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  constructor() {
    this.setEvents()
  }

  private setEvents(): void {
    document.addEventListener("DOMContentLoaded", () => {
      let textarea = document.querySelector('textarea#textPost') as HTMLElement
      if(!textarea) return

      textarea.focus()
    })
  }
}

const homePageComponent = new HomePageComponent()