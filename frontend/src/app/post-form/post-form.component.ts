import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { IPostForm } from '../../interfaces/PostFormInterface';

@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html'
})
export class PostFormComponent {
  postFormState: IPostForm = {
    isServicePost: new FormControl(false)
  };

}
