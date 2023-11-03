import { Repository } from '../shared/repository.js'
import { User } from './user.entity.js'
import { db } from '../shared/db/connection.js'
import { ObjectId } from 'mongodb';

const users = db.collection<User>('users')

export class UserRepository implements Repository<User>{
    public async findAll(): Promise<User[] | undefined> {
        return await users.find().toArray()
    }
    
    public async findOne(item: {id: ObjectId}): Promise<User | undefined> {
        return await users.findOne({ _id: item.id }) as User
    }

    public async findByEmailAndPassword(item: {email: string, password: string}): Promise<User | undefined> {
        return await users.findOne({ email: item.email, password: item.password }) as User
    }
    
    public async add(item: User): Promise<User | undefined> {
        await users.insertOne(item)
        return item
    }
    
    public async update(id: string, item: User): Promise<User | undefined> {
        const _id = new ObjectId(id)
        return await users.findOneAndUpdate({ _id }, { $set: item }, { returnDocument: 'after' }) as User
    }
    
    public async delete(item: { id: string}): Promise<User | undefined> {
        const _id = new ObjectId(item.id)
        return await users.findOneAndDelete({ _id}) as User
    }
} 