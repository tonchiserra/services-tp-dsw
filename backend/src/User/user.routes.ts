import { Router } from 'express'

import { sanitizeUserInput, findAll, findOne, add, update, remove, findByEmailAndPassword, verifyToken } from './user.controller.js'

const userRouter = Router()

userRouter.get('/', verifyToken, findAll)
userRouter.get('/:_id', verifyToken, findOne)
userRouter.post('/signin', findByEmailAndPassword)
userRouter.post('/', sanitizeUserInput, add)
userRouter.patch('/:_id', verifyToken, sanitizeUserInput, update)
userRouter.delete('/:_id', verifyToken, remove)

export { userRouter }