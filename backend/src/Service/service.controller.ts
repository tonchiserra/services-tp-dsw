// import { NextFunction, Request, Response } from "express"
// import { ServiceRepository } from "./service.repository.js"
// import { Service } from "./service.entity.js"

// const repository = new ServiceRepository()

// function sanitizeServiceInput(req: Request, res: Response, next: NextFunction) {
//     req.body.sanitizedInput = {
//         description: req.body.description,
//         price: req.body.price
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
//     const id = req.params.serviceId

//     const service = await repository.findOne({ id })

//     if(!service){
//         return res.status(404).send({ message: "Service not found" })
//     }

//     res.json({ data: service })
// }

// async function add(req: Request, res: Response) {
//     const input = req.body.sanitizedInput
//     const serviceInput = new Service(
//         input.description,
//         input.price
//     )
//     const service = await repository.add(serviceInput)

//     return res.status(201).send({ message: 'Service created', data: service })
// }

// async function update(req: Request, res: Response) {
//     req.body.sanitizedInput.serviceId = req.params.serviceId

//     const service = await repository.update(req.body.sanitizedInput)

//     if(!service) return res.status(404).send({ message: 'Service not found' })

//     return res.status(200).send({ message: 'Service updated successfully', data: service }) 
// }

// async function remove(req: Request, res: Response) {
//     const id = req.params.serviceId
//     const service = await repository.remove({ id })

//     if(!service) return res.status(404).send({ message: 'Service not found' })

//     return res.status(200).send({ message: 'Service deleted successfully', data: service }) 
// }

// export { sanitizeServiceInput, findAll, findOne, add, update, remove }