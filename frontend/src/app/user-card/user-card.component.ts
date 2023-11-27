import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html'
})
export class UserCardComponent {
  @Input() user: any;

  constructor() { }

}
