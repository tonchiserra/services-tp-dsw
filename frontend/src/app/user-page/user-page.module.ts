import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';

import { UserPageComponent } from './user-page.component';
import { PostCardComponent } from '../post-card/post-card.component';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form.component';

const routesChild: Routes = [
    { path: 'user/:username/posts', component: UserPageComponent },
    { path: 'user/:username/likes', component: UserPageComponent },
    { path: 'user/:username/media', component: UserPageComponent },
]

@NgModule({
    declarations: [
        UserPageComponent,
        PostCardComponent,
        EditProfileFormComponent
    ],
    imports: [
        RouterModule.forChild(routesChild),
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [
        UserPageComponent,
        PostCardComponent
    ],
    providers: []
})
export class UserPageModule { }