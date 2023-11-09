import { ObjectId } from 'mongodb';

export class Post {
    constructor(
        public content: string,
        public media: string,
        public postType : string,
        public date: string,
        public Likes: ObjectId[],
        public rePosts: ObjectId[],
        public _id?: ObjectId
    ) {}
}