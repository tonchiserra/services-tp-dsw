import { NextFunction, Request, Response } from "express"
import { PostRepository } from "./post.repository.js"
import { Post } from "./post.entity.js"
import { ObjectId } from "mongodb"

const repository = new PostRepository()

function sanitizePostInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
       content: req.body.content,
       likes: req.body.likes,
       rePosts: req.body.rePosts,
       media: req.body.media,
       postType: req.body.postType,
       date: req.body.date
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
      input.likes,
      input.rePosts,
      input.media,
      input.postType,
      input.date
    )
    const post = await repository.add(postInput)
  
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