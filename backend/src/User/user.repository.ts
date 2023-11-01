import { Repository } from '../shared/repository.js'
import { User } from './user.entity.js'
import { db } from '../shared/db/connection.js'

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
    
    public async findOne(item: {id: string}): Promise<User | undefined> {
        return await usersArray.find((user) => user.userId === item.id) // call to ddbb
    }
    
    public async add(item: User): Promise<User | undefined> {
        await usersArray.push(item) // call to ddbb
        return item
    }
    
    public async update(item: User): Promise<User | undefined> {
        const userIdx = usersArray.findIndex((user) =>user.userId = item.userId)

        if(userIdx !== -1) {
            usersArray[userIdx] = {...usersArray[userIdx], ...item}
        }

        return await usersArray[userIdx]
    }
    
    public async remove(item: { id: string}): Promise<User | undefined> {
        const userIdx = usersArray.findIndex((user) =>user.userId === item.id);
        if(userIdx !== -1) {
            const deletedUser = usersArray[userIdx]
            usersArray.splice(userIdx, 1)
            return deletedUser
        }

        return await usersArray[userIdx]
    }
} 