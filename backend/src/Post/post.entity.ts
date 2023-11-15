import { ObjectId } from 'mongodb';

export class Post {
    constructor(
        public content: string,
        public media: string,
        public postType : string,
        public date: Date,
        public likes: ObjectId[],
        public rePosts: ObjectId[],
        public userId: ObjectId,
        public _id?: ObjectId
    ) {}
}