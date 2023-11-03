import { Repository } from "../shared/repository";
import { ServiceType } from "./serviceType.entity.js"
import { db } from '../shared/db/connection.js'
import { ObjectId } from 'mongodb';
import { Service } from "../Service/service.entity";

const serviceTypes = db.collection<ServiceType>('serviceTypes')

export class ServiceTypeRepository implements Repository <ServiceType>{
    public async findAll(): Promise<ServiceType[] | undefined> {
        return await serviceTypes.find().toArray();
    }

    public async findOne(item: { id: ObjectId; }): Promise<ServiceType | undefined> {
        return await serviceTypes.findOne({ _id: item.id }) as ServiceType    
    }

    public async add(item: ServiceType): Promise<ServiceType | undefined> {
        await serviceTypes.insertOne(item)
        return item
    }

    public async update(id: string, item: ServiceType): Promise<ServiceType | undefined> {
        const _id = new ObjectId(id)
        return await serviceTypes.findOneAndUpdate({ _id }, { $set: item}, { returnDocument: 'after'}) as ServiceType
    }

    public async delete(item: { id: string}): Promise<ServiceType | undefined> {
        const _id = new ObjectId(item.id)
        return await serviceTypes.findOneAndDelete({ _id }) as ServiceType
    }
}