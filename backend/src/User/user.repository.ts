import { Repository } from '../shared/repository.js'
import { User } from './user.entity.js'
import { db } from '../shared/db/connection.js'
import { ObjectId } from 'mongodb';

const usersArray: User[] = [
    new User(
        "GuidoBitti",
        3415087210,
        "guidobitti@gmail.com",
        "g.bitti",
        "pa$$w0rd",
        "/img002",
        "Me llamo Guido"
    )
] // our temporally ddbb

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
    
    public async update(item: User): Promise<User | undefined> {
        const userIdx = usersArray.findIndex((user) =>user._id = item._id)

        if(userIdx !== -1) {
            usersArray[userIdx] = {...usersArray[userIdx], ...item}
        }

        return await usersArray[userIdx]
    }
    
    public async remove(item: { id: ObjectId}): Promise<User | undefined> {
        const userIdx = usersArray.findIndex((user) =>user._id === item.id);
        if(userIdx !== -1) {
            const deletedUser = usersArray[userIdx]
            usersArray.splice(userIdx, 1)
            return deletedUser
        }

        return await usersArray[userIdx]
    }
} 