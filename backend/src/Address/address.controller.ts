// import { NextFunction, Request, Response } from "express"
// import { AddressRepository } from "./address.repository.js"
// import { Address } from "./address.entity.js"
// import { ObjectId } from "mongodb"

// const repository = new AddressRepository()

// function sanitizeAddressInput(req: Request, res: Response, next: NextFunction) {
//     req.body.sanitizedInput = {
//         street: req.body.street,
//         streetNumber: req.body.streetNumber,
//         country: req.body.country,
//         city: req.body.city
//     }
  
//     Object.keys(req.body.sanitizedInput).forEach((key) => {
//         if (req.body.sanitizedInput[key] === undefined) {
//             delete req.body.sanitizedInput[key]
//         }
//     })

//     next()
// }

// async function findAll(req: Request, res: Response) {
//     res.json({ data: await repository.findAll() })
// }

// async function findOne(req: Request, res: Response) {
//     const id = new ObjectId(req.params.addressId)

//     const address = await repository.findOne({ id })

//     if(!address){
//         return res.status(404).send({ message: "Address not found" })
//     }

//     res.json({ data: address })
// }

// async function add(req: Request, res: Response) {
//     const input = req.body.sanitizedInput
//     const addressInput = new Address(
//         input.street,
//         input.streetNumber,
//         input.country,
//         input.city
//     )

//     const address = await repository.add(addressInput)

//     return res.status(201).send({ message: 'Address created', data: address })
// }

// async function update(req: Request, res: Response) {
//     req.body.sanitizedInput.addressId = req.params.addressId

//     const address = await repository.update(req.body.sanitizedInput)

//     if(!address) return res.status(404).send({ message: 'Address not found' })

//     return res.status(200).send({ message: 'Address updated successfully', data: address }) 
// }

// async function remove(req: Request, res: Response) {
//     const id = new ObjectId(req.params.addressId)
//     const address = await repository.remove({ id })

//     if(!address) return res.status(404).send({ message: 'Address not found' })

//     return res.status(200).send({ message: 'Address deleted successfully', data: address }) 
// }

// export { sanitizeAddressInput, findAll, findOne, add, update, remove }