import { Repository } from '../shared/repository.js'
import { Post } from './post.entity.js'

const posts: Post[] = [
    new Post(
        'Hola me llamo guido bitti y es mi primer post',
        58,
        13,
        'imgPostGuidov1.jpg',
        'With service',
        '29/9/2023'
    )
] // our temporally ddbb

export class PostRepository implements Repository<Post>{
    public async findAll(): Promise<Post[] | undefined> {
        return await posts // call to ddbb
    }
    
    public async findOne(item: {id: string}): Promise<Post | undefined> {
        return await posts.find((post) => post.postId === item.id) // call to ddbb
    }
    
    public async add(item: Post): Promise<Post | undefined> {
        posts.push(item) // call to ddbb
        return await item
    }
    
    public async update(item: Post): Promise<Post | undefined> {
        const postIdx = posts.findIndex((post) =>post.postId = item.postId)

        if(postIdx !== -1) {
            posts[postIdx] = {...posts[postIdx], ...item}
        }

        return await posts[postIdx]
    }
    
    public async remove(item: { id: string}): Promise<Post | undefined> {
        const postIdx = posts.findIndex((post) =>post.postId === item.id);
        if(postIdx !== -1) {
            const deletedPost = posts[postIdx]
            posts.splice(postIdx, 1)
            return await deletedPost
        }

        return await posts[postIdx]
    }
} 