import { NextFunction, Request, Response } from "express"
import { AddressRepository } from "./address.repository.js"
import { Address } from "./address.entity.js"

const repository = new AddressRepository()

function sanitizeAddressInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        street: req.body.street,
        strNumber: req.body.strNumber,
        country: req.body.country,
        city: req.body.city
    }
  
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key]
        }
    })

    next()
}

function findAll(req: Request, res: Response) {
    res.json({ data: repository.findAll() })
}

function findOne(req: Request, res: Response) {
    const id = req.params.id
    const address = repository.findOne({ id })

    if(!address) return res.status(404).send({ message: "Address not found" })

    res.json({ data: address })
}

function add(req: Request, res: Response) {
    const input = req.body.sanitizeAddressInput
    const addressInput = new Address(
        input.street,
        input.streetNumber,
        input.country,
        input.city
    )

    const address = repository.add(addressInput)

    return res.status(201).send({ message: 'Address created', data: address })
}

function update(req: Request, res: Response) {
    req.body.sanitizeAddressInput = req.params.id

    const address = repository.update(req.body.sanitizeAddressInput)

    if(!address) return res.status(404).send({ message: 'Address not found' })

    return res.status(200).send({ message: 'Address updated successfully', data: address }) 
}

function remove(req: Request, res: Response) {
    const id = req.params.id
    const address = repository.remove({ id })

    if(!address) return res.status(404).send({ message: 'Address not found' })

    return res.status(200).send({ message: 'Address deleted successfully', data: address }) 
}

export { sanitizeAddressInput, findAll, findOne, add, update, remove }