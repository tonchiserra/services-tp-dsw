import { ObjectId } from 'mongodb';
import { Service } from '../Service/service.entity';

export class Post {
    constructor(
        public content: string,
        public media: string,
        public postType : string,
        public date: Date,
        public likes: ObjectId[],
        public rePosts: ObjectId[],
        public userId: ObjectId,
        public service: Service,
        public _id?: ObjectId
    ) {}
}