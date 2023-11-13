import { ObjectId } from 'mongodb';

export class Address {
  constructor(
    public country: string,
    public province: string,
    public city: string,
    public _id?: ObjectId
  ) { }
}