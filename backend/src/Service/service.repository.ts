import { Repository } from '../shared/repository.js'
import { Service } from './service.entity.js'
import { db } from '../shared/db/connection.js'
import { ObjectId } from 'mongodb';

const services = db.collection<Service>('services')

export class ServiceRepository implements Repository<Service>{
    public async findAll(): Promise<Service[] | undefined> {
        return await services.find().toArray()
    }

    public async findOne(item: {id: ObjectId}): Promise<Service | undefined> {
        return await services.findOne({ _id: item.id }) as Service
    }

    public async add(item: Service): Promise<Service | undefined> {
        await services.insertOne(item)
        return item
    }

    public async update(id: string, item: Service): Promise<Service | undefined> {
        const _id = new ObjectId(id)
        return await services.findOneAndUpdate({ _id }, { $set: item }, { returnDocument: 'after' }) as Service
    }

    public async delete(item: { id: string}): Promise<Service | undefined> {
        const _id = new ObjectId(item.id)
        return await services.findOneAndDelete({ _id }) as Service
    }
}