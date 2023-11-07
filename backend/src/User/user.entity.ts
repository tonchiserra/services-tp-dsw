import { ObjectId } from 'mongodb';

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
        public _id?: ObjectId
    ) {}
}