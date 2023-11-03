import { Router } from 'express'

import { sanitizeServiceTypeInput, findAll, findOne, add, update, remove } from './serviceType.controller.js'

const serviceTypeRouter = Router()

serviceTypeRouter.get('/', findAll)
serviceTypeRouter.get('/:_id', findOne)
serviceTypeRouter.post('/', sanitizeServiceTypeInput, add)
serviceTypeRouter.patch('/:_id', sanitizeServiceTypeInput, update)
serviceTypeRouter.delete('/:_id', remove)

export { serviceTypeRouter }