import { Repository } from '../shared/repository.js'
import { User } from './user.entity.js'

const users: User[] = [
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

export class UserRepository implements Repository<User>{
    public findAll(): User[] | undefined {
        return users // call to ddbb
    }
    
    public findOne(item: {id: string}): User | undefined {
        return users.find((user) => user.userId === item.id) // call to ddbb
    }
    
    public add(item: User): User | undefined {
        users.push(item) // call to ddbb
        return item
    }
    
    public update(item: User): User | undefined {
        const userIdx = users.findIndex((user) =>user.userId = item.userId)

        if(userIdx !== -1) {
            users[userIdx] = {...users[userIdx], ...item}
        }

        return users[userIdx]
    }
    
    public remove(item: { id: string}): User | undefined {
        const userIdx = users.findIndex((user) =>user.userId === item.id);
        if(userIdx !== -1) {
            const deletedUser = users[userIdx]
            users.splice(userIdx, 1)
            return deletedUser
        }

        return users[userIdx]
    }
} 