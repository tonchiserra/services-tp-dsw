// import { NextFunction, Request, Response } from "express"
// import { ServiceType } from "./serviceType.entity.js"
// import { ServiceTypeRepository } from "./serviceType.repository.js"

// const repository = new ServiceTypeRepository()

// function sanitizeServiceTypeInput(req: Request, res: Response, next: NextFunction) {
//     req.body.sanitizedInput = {
//         name: req.body.name
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
//     const id = req.params.serviceTypeId

//     const serviceType = await repository.findOne({ id })

//     if(!serviceType){
//         return res.status(404).send({ message: "ServiceType not found" })
//     }

//     res.json({ data: serviceType })
// }

// async function add(req: Request, res: Response) {
//     const input = req.body.sanitizedInput
//     const serviceTypeInput = new ServiceType(
//         input.name
//     )

//     const serviceType = await repository.add(serviceTypeInput)

//     return res.status(201).send({ message: 'ServiceType created', data: serviceType })
// }

// async function update(req: Request, res: Response) {
//     req.body.sanitizedInput.serviceTypeId = req.params.serviceTypeId

//     const serviceType = await repository.update(req.body.sanitizedInput)

//     if(!serviceType) return res.status(404).send({ message: 'ServiceType not found' })

//     return res.status(200).send({ message: 'ServiceType updated successfully', data: serviceType }) 
// }

// async function remove(req: Request, res: Response) {
//     const id = req.params.serviceTypeId
//     const serviceType = await repository.remove({ id })

//     if(!serviceType) return res.status(404).send({ message: 'ServiceType not found' })

//     return res.status(200).send({ message: 'ServiceType deleted successfully', data: serviceType }) 
// }

// export { sanitizeServiceTypeInput, findAll, findOne, add, update, remove }