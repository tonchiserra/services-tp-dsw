import { FormControl } from '@angular/forms';

export interface IPostForm {
    isServicePost: FormControl<boolean | null>,
    service: FormControl<string | null>,
    text: FormControl<string | null>,
    files: FormControl<File | null>
}

export interface IPostFormData {
    isServicePost: boolean,
    postType: 'normal' | 'service',
    content: string,
    media: File | null | undefined,
    date: Date,
    service: {}
}