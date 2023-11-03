import { Repository } from '../shared/repository.js'
import { Address } from './address.entity.js'
import { db } from '../shared/db/connection.js'
import { ObjectId } from 'mongodb';


const addresses = db.collection<Address>('addresses')


export class AddressRepository implements Repository<Address>{
  public async findAll(): Promise<Address[] | undefined> {
    return await addresses.find().toArray()
  }

  public async findOne(item: {id: ObjectId}): Promise<Address | undefined> {
    return await addresses.findOne({ _id: item.id }) as Address
  }

  public async add(item: Address): Promise<Address | undefined> {
    await addresses.insertOne(item)
    return item
  }

  public async update(id: string, item: Address): Promise<Address | undefined> {
    const _id = new ObjectId(id)
    return await addresses.findOneAndUpdate({ _id }, { $set: item }, { returnDocument: 'after' }) as Address
  }

  public async delete(item: { id: string}): Promise<Address | undefined> {
    const _id = new ObjectId(item.id)
    return await addresses.findOneAndDelete({ _id }) as Address
  }
}