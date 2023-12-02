import { Router } from 'express'
import { sanitizePostInput, findAll, findOne, add, update, remove } from './post.controller.js'
import multer from '../shared/multer.js'

const postRouter = Router()

postRouter.get('/', findAll)
postRouter.get('/:_id', findOne)
postRouter.post('/', multer.single('media'), sanitizePostInput, add)
postRouter.patch('/:_id', sanitizePostInput, update)
postRouter.delete('/:_id', remove)

export { postRouter }