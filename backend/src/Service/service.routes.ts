import { Router } from 'express'

import { sanitizeServiceInput, findAll, findOne, add, update, remove } from './service.controller.js'

const serviceRouter = Router()

serviceRouter.get('/', findAll)
serviceRouter.get('/:_id', findOne)
serviceRouter.post('/', sanitizeServiceInput, add)
serviceRouter.patch('/:_id', sanitizeServiceInput, update)
serviceRouter.delete('/:_id', remove)

export { serviceRouter }