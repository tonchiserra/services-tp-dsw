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
    public findAll(): Post[] | undefined {
        return posts // call to ddbb
    }
    
    public findOne(item: {id: string}): Post | undefined {
        return posts.find((post) => post.postId === item.id) // call to ddbb
    }
    
    public add(item: Post): Post | undefined {
        posts.push(item) // call to ddbb
        return item
    }
    
    public update(item: Post): Post | undefined {
        const postIdx = posts.findIndex((post) =>post.postId = item.postId)

        if(postIdx !== -1) {
            posts[postIdx] = {...posts[postIdx], ...item}
        }

        return posts[postIdx]
    }
    
    public remove(item: { id: string}): Post | undefined {
        const postIdx = posts.findIndex((post) =>post.postId === item.id);
        if(postIdx !== -1) {
            const deletedPost = posts[postIdx]
            posts.splice(postIdx, 1)
            return deletedPost
        }

        return posts[postIdx]
    }
} 