import { NextFunction, Request, Response } from "express"
import { UserRepository } from "./user.repository.js"
import { User } from "./user.entity.js"

const repository = new UserRepository()

function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        nameSurname: req.body.nameSurname,
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

function findAll(req: Request, res: Response) {
    res.json({ data: repository.findAll() })
}

function findOne(req: Request, res: Response) {
    const id = req.params.userId

    const user = repository.findOne({ id })

    if(!user){
        return res.status(404).send({ message: "User not found" })
    }

    res.json({ data: user })
}

function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput
    const userInput = new User(
        input.nameSurname,
        input.phone,
        input.mail,
        input.username,
        input.password,
        input.profileImg,
        input.description
    )
    const user = repository.add(userInput)

    return res.status(201).send({ message: 'User created', data: user })
}

function update(req: Request, res: Response) {
    req.body.sanitizedInput.userId = req.params.userId

    const user = repository.update(req.body.sanitizedInput)

    if(!user) return res.status(404).send({ message: 'User not found' })

    return res.status(200).send({ message: 'User updated successfully', data: user }) 
}

function remove(req: Request, res: Response) {
    const id = req.params.userId
    const user = repository.remove({ id })

    if(!user) return res.status(404).send({ message: 'User not found' })

    return res.status(200).send({ message: 'User deleted successfully', data: user }) 
}

export { sanitizeUserInput, findAll, findOne, add, update, remove }