import { Router } from 'express'

import { sanitizeAddressInput, findAll, findOne, add, update, remove } from './address.controller.js'

const addressRouter = Router()

addressRouter.get('/', findAll)
addressRouter.get('/:_id', findOne)
addressRouter.post('/', sanitizeAddressInput, add)
addressRouter.patch('/:_id', sanitizeAddressInput, update)
addressRouter.delete('/:_id', remove)

export { addressRouter }