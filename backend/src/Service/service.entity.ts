import { ObjectId } from 'mongodb';

export class Service {
    constructor(
        public type: string,
        public description: string,
        public price: number,
        public _id?: ObjectId
    ) {}
}