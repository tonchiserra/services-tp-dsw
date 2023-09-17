import { Router } from 'express'

import { sanitizeUserInput, findAll, findOne, add, update, remove } from './user.controller.js'

const userRouter = Router()

userRouter.get('/', findAll)
userRouter.get('/:userId', findOne)
userRouter.post('/', sanitizeUserInput, add)
userRouter.patch('/:userId', sanitizeUserInput, update)
userRouter.delete('/:userId', remove)

export { userRouter }