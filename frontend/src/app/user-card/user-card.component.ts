import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html'
})
export class UserCardComponent {
  @Input() user: any;
  imageColor = '#f4f4f4'

  constructor() { }

  ngOnInit() {
    this.imageColor = this.user.imageColor || '#f4f4f4'
  }
}
