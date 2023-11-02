import { ObjectId } from 'mongodb';

export class Address {
    constructor(
        public street: string,
        public streetNumber: number,
        public country: string,
        public city: string,
        public _id = ObjectId
    ) {}
}