import crypto from 'node:crypto'

export class Post {
    constructor(
        public content: string,
        public likes: number,
        public rePosts: number,
        public media: string,
        public postType : string,
        public date: string,
        public postId = crypto.randomUUID()
    ) {}
}