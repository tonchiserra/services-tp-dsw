import { ObjectId } from 'mongodb';
import { Post } from '../Post/post.entity';

export class User {
    constructor(
        public name: string,
        public phone: number,
        public email: string,
        public username: string,
        public password: string,
        public profileImg: string,
        public description: string,
        public token: string,
        public services: ObjectId[],
        public posts: Post[],
        public _id?: ObjectId
    ) {}
}