import { ObjectId } from 'mongodb';
import { Post } from '../Post/post.entity';
import { Address } from '../Address/address.entity';

export class User {
    constructor(
        public name: string,
        public phone: number,
        public email: string,
        public username: string,
        public password: string,
        public profileImg: string,
        public description: string,
        public address: Address,
        public token: string,
        public services: ObjectId[],
        public posts: Post[],
        public followers: ObjectId[],
        public follows: ObjectId[],
        public postsLiked: ObjectId[],
        public _id?: ObjectId
    ) {}
}