import { NextFunction, Request, Response } from "express"
import { PostRepository } from "./post.repository.js"
import { Post } from "./post.entity.js"
import { ObjectId } from "mongodb"
import { UserRepository } from "../User/user.repository.js"

const repository = new PostRepository()
const userRepository = new UserRepository()

function sanitizePostInput(req: Request, res: Response, next: NextFunction) {
    let post = req.body.post ? req.body.post: req.body
    req.body.sanitizedInput ={
        content: post.content,
        media: post.media,
        postType: post.postType,
        date: post.date,
        likes: post.likes,
        userId: req.body.user._id,
        service: post.service,
        rePosts: post.rePosts
    }   

    Object.keys(req.body.sanitizedInput).forEach((key)=> {
        if(req.body.sanitizedInput[key] === undefined){
            delete req.body.sanitizedInput[key]
        }
    })

    next()
}

async function findAll(req: Request, res: Response){
    res.json({data: await repository.findAll() })
}

async function findOne(req: Request, res: Response){
    const id = new ObjectId(req.params._id)

    const post = await repository.findOne({ id })

    if(!post){
        return res.status(404).send({ message:"Post not found", data: id})
    }

    res.json({ data: post })
}

async function add(req:Request, res:Response){
    const input = req.body.sanitizedInput
    const postInput = new Post(
      input.content,
      input.media,
      input.postType,
      input.date,
      input.likes,
      input.rePosts,
      input.userId,
      input.service
    )
    const post = await repository.add(postInput)
    
    if(!post) return res.status(404).send({ message: 'Post not found' })

    const userToUpdate = req.body.user
    userToUpdate.posts ? userToUpdate.posts.push(post) : userToUpdate.posts = [post]

    let userId = userToUpdate._id
    delete userToUpdate._id
    
    const userUpdated = await userRepository.update(userId, userToUpdate)

    if(!userUpdated) return res.status(404).send({ message: 'User not found' })
    
    return res.status(201).send({ message: 'Post created', data:post })
}

async function update(req: Request, res: Response) {
    const post = await repository.update(req.params._id, req.body.sanitizedInput)
  
    if (!post) {
      return res.status(404).send({ message: 'Post not found' })
    }
  
    return res.status(200).send({ message: 'Post updated successfully', data: post })
}

async function remove(req: Request, res: Response) {
    const id = req.params._id
    const post = await repository.delete({ id })
  
    if (!post) return res.status(404).send({ message: 'Post not found' })
  
    return res.status(200).send({ message: 'Post deleted successfully', data: post })
}

export { sanitizePostInput, findAll, findOne, add, update, remove  }