import { NextFunction, Request, Response } from "express"
import { UserRepository } from "./user.repository.js"
import { User } from "./user.entity.js"

const repository = new UserRepository()

function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        name: req.body.name,
        phone: req.body.phone,
        mail: req.body.mail,
        username: req.body.username,
        password: req.body.password,
        profileImg: req.body.profileImg,
        description: req.body.description
    }
  
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key]
        }
    })

    next()
}

async function findAll(req: Request, res: Response) {
    res.json({ data: await repository.findAll() })
}

async function findOne(req: Request, res: Response) {
    const id = req.params.userId

    const user = await repository.findOne({ id })

    if(!user){
        return res.status(404).send({ message: "User not found" })
    }

    res.json({ data: user })
}

async function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput
    const userInput = new User(
        input.name,
        input.phone,
        input.mail,
        input.username,
        input.password,
        input.profileImg,
        input.description
    )
    const user = await repository.add(userInput)

    return res.status(201).send({ message: 'User created', data: user })
}

async function update(req: Request, res: Response) {
    req.body.sanitizedInput.userId = req.params.userId

    const user = await repository.update(req.body.sanitizedInput)

    if(!user) return res.status(404).send({ message: 'User not found' })

    return res.status(200).send({ message: 'User updated successfully', data: user }) 
}

async function remove(req: Request, res: Response) {
    const id = req.params.userId
    const user = await repository.remove({ id })

    if(!user) return res.status(404).send({ message: 'User not found' })

    return res.status(200).send({ message: 'User deleted successfully', data: user }) 
}

export { sanitizeUserInput, findAll, findOne, add, update, remove }