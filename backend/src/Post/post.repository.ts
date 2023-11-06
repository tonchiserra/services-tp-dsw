import { Repository } from '../shared/repository.js'
import { Post } from './post.entity.js'
import { db } from '../shared/db/connection.js'
import { ObjectId } from 'mongodb';

const posts = db.collection<Post>('posts')

export class PostRepository implements Repository<Post>{
    public async findAll(): Promise<Post[] | undefined> {
        return await posts.find().toArray()
    }

    public async findOne(item: {id: ObjectId}): Promise<Post | undefined> {
        return await posts.findOne({ _id: item.id }) as Post
    }

    public async add(item: Post): Promise<Post | undefined> {
        await posts.insertOne(item)
        return item
    }

    public async update(id: string, item: Post): Promise<Post | undefined> {
        const _id = new ObjectId(id)
        return await posts.findOneAndUpdate({ _id }, { $set: item }, { returnDocument: 'after' }) as Post
    }

    public async delete(item: { id: string}): Promise<Post | undefined> {
        const _id = new ObjectId(item.id)
        return await posts.findOneAndDelete({ _id }) as Post
    }
}