import { ObjectId } from 'mongodb';

export class ServiceType {
    constructor(
        public name: string,
        public _id?: ObjectId
    ) {}
}