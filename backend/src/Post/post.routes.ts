import { Router } from 'express'

import { sanitizePostInput, findAll, findOne, add, update, remove } from './post.controller.js'

const postRouter = Router()

postRouter.get('/', findAll)
postRouter.get('/:postId', findOne)
postRouter.post('/', sanitizePostInput, add)
postRouter.patch('/:postId', sanitizePostInput, update)
postRouter.delete('/:postId', remove)

export { postRouter }