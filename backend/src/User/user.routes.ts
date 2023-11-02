import { Router } from 'express'

import { sanitizeUserInput, findAll, findOne, add, update, remove, findByEmailAndPassword } from './user.controller.js'

const userRouter = Router()

userRouter.get('/', findAll)
userRouter.get('/:_id', findOne)
userRouter.get('/:email/:password', findByEmailAndPassword)
userRouter.post('/', sanitizeUserInput, add)
userRouter.patch('/:_id', sanitizeUserInput, update)
userRouter.delete('/:_id', remove)

export { userRouter }