import { Router } from 'express'

import { sanitizeAddressInput, findAll, findOne, add, update, remove } from './address.controller.js'

const addressRouter = Router()

addressRouter.get('/', findAll)
addressRouter.get('/:addressId', findOne)
addressRouter.post('/', sanitizeAddressInput, add)
addressRouter.patch('/:addressId', sanitizeAddressInput, update)
addressRouter.delete('/:addressId', remove)

export { addressRouter }