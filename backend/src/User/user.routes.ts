import { Router } from 'express'

import { sanitizeUserInput, findAll, findOne, findOneByUsername, add, update, remove, findByEmailAndPassword, verifyToken, findByToken } from './user.controller.js'

const userRouter = Router()

userRouter.get('/', verifyToken, findAll)
userRouter.get('/token/:token', verifyToken, findByToken)
userRouter.get('/:_id', verifyToken, findOne)
userRouter.get('/:username', verifyToken, findOneByUsername)
userRouter.post('/signin', findByEmailAndPassword)
userRouter.post('/', sanitizeUserInput, add)
userRouter.patch('/:_id', verifyToken, sanitizeUserInput, update)
userRouter.delete('/:_id', verifyToken, remove)

export { userRouter }