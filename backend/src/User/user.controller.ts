import { NextFunction, Request, Response } from "express"
import { UserRepository } from "./user.repository.js"
import { User } from "./user.entity.js"
import { ObjectId } from "mongodb"

import jwt from 'jsonwebtoken'

const repository = new UserRepository()
const jwtSecret: string = 'services-tp-dsw-user-token'

function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        name: req.body.name,
        imageColor: req.body.imageColor,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        profileImg: req.body.profileImg,
        description: req.body.description,
        address: req.body.address,
        token: req.body.token,
        services: req.body.services,
        followers: req.body.followers,
        follows: req.body.follows,
        postsLiked: req.body.postsLiked,
        posts: req.body.posts
    }

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key]
        }
    })

    next()
}

async function findAll(req: Request, res: Response) {

    if(!!!req.query.user) res.json({ data: await repository.findAll() })
    else res.json({ data: await repository.findByQuery((req.query.user as string)) })
}

async function findOne(req: Request, res: Response) {
    const param = req.params._id

    try{
        const id = new ObjectId(param)
        const user = await repository.findOne({ id })

        if(!user){
            return res.status(404).send({ message: "User not found" })
        }

        res.json({ data: user })
        
    } catch(err) {
        const username = param
        const user = await repository.findOneByUsername({ username })

        if(!user){
            return res.status(404).send({ message: "User not found" })
        }

        res.json({ data: user })
    }
}

async function findOneByUsername(req: Request, res: Response) {
    const username = req.params.username
    const user = await repository.findOneByUsername({ username })

    if(!user){
        return res.status(404).send({ message: "User not found" })
    }

    res.json({ data: user })
}

async function findByEmailAndPassword(req: Request, res: Response) {
    
    const user = await repository.findByEmailAndPassword({ email: req.body.email })

    if(!user) {
        res.status(404)
        res.statusMessage = `[{"validation": "email","code": "invalid_string","message": "Email doesn't exists","path": ["email"]}]`
        return res.send({ message: "Email doesn't exists" })
    }
      
    if(user.password !== req.body.password) {
        res.status(404)
        res.statusMessage = '[{"validation": "password","code": "invalid_string","message": "Wrong password","path": ["password"]}]'
        return res.send({ message: "Wrong password"})
    }

    const token = jwt.sign({_id: user._id}, jwtSecret)

    res.json({ message: 'User logged', data: user, token: token })
}

async function findByToken(req: Request, res: Response) {
    const user = await repository.findByToken({ token: req.params.token })

    if(!user){
        return res.status(404).send({ message: "Token not found" })
    }

    res.json({ data: user })
}

async function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput
    const userInput = new User(
        input.name,
        input.imageColor,
        input.email,
        input.username,
        input.password,
        input.profileImg,
        input.description,
        input.address,
        input.token,
        input.services,
        input.followers,
        input.follows,
        input.postsLiked,
        input.posts
    )

    if(await repository.verifyUsername(userInput.username)){
        res.status(404)
        res.statusMessage = '[{"validation": "username","code": "invalid_string","message": "Username already in use","path": ["username"]}]'
        return res.send({ message: "Username already in use"})
    }
     
    if(await repository.verifyEmail(userInput.email)){
        res.status(404)
        res.statusMessage = '[{"validation": "email","code": "invalid_string","message": "Email already in use","path": ["email"]}]'
        return res.send({ message: "Email already in use"})
    }
    
    const user = await repository.add(userInput)
    if(!user) return res.status(500).send({ message: 'Internal server error' })

    const token = jwt.sign({_id: user._id}, jwtSecret)
    return res.status(201).send({ message: 'User created', data: user, token: token })
    
}

async function update(req: Request, res: Response) {
    const user = await repository.update(req.params._id, req.body.sanitizedInput)

    if(!user){
        return res.status(404).send({ message: 'User not found'})
    }

    return res.status(200).send({ message: 'User updated successfully', data:user})
}

async function remove(req: Request, res: Response) {
    const id = req.params._id
    const user = await repository.delete({ id })

    if(!user) return res.status(404).send({ message: 'User not found' })

    return res.status(200).send({ message: 'User deleted successfully', data: user }) 
}

function verifyToken(req: Request, res: Response, next: NextFunction) {
    if(!req.headers.authorization) return res.status(401).send("You don't have permissions")

    const token = req.headers.authorization.split(' ')[1]
    if(token === 'null') return res.status(401).send("You don't have permissions")

    const payload = jwt.verify(token, jwtSecret)
    if(typeof payload === 'string') return res.status(401).send("You don't have permissions")
    else req.body.userId = payload._id

    next()
}

export { sanitizeUserInput, findAll, findOne, findOneByUsername, add, update, remove, findByEmailAndPassword, verifyToken, findByToken }