import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';

import { UserPageComponent } from './user-page.component';
import { PostCardComponent } from '../post-card/post-card.component';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form.component';

const routesChild: Routes = [
    { path: 'user/posts', component: UserPageComponent },
    { path: 'user/likes', component: UserPageComponent },
    { path: 'user/media', component: UserPageComponent },
]

@NgModule({
    declarations: [
        UserPageComponent,
        PostCardComponent,
        EditProfileFormComponent
    ],
    imports: [
        RouterModule.forChild(routesChild),
        ReactiveFormsModule
    ],
    exports: [
        UserPageComponent,
        PostCardComponent
    ],
    providers: []
})
export class UserPageModule { }