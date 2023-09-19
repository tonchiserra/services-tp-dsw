import { FormControl } from '@angular/forms';

export interface IPostForm {
    isServicePost: FormControl<boolean | null>,
    service: FormControl<string | null>,
    text: FormControl<string | null>,
    files: FormControl<FileList | null>
}

export interface IPostFormData {
    isServicePost: boolean,
    service: string,
    text: string,
    files: FileList | null
}