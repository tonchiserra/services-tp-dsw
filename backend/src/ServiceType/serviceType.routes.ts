import { Router } from 'express'

import { sanitizeServiceTypeInput, findAll, findOne, add, update, remove } from './serviceType.controller.js'

const serviceTypeRouter = Router()

serviceTypeRouter.get('/', findAll)
serviceTypeRouter.get('/:serviceTypeId', findOne)
serviceTypeRouter.post('/', sanitizeServiceTypeInput, add)
serviceTypeRouter.patch('/:serviceTypeId', sanitizeServiceTypeInput, update)
serviceTypeRouter.delete('/:serviceTypeId', remove)

export { serviceTypeRouter }