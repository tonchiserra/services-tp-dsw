// import { Repository } from "../shared/repository";
// import { ServiceType } from "./serviceType.entity.js";

// const serviceTypes: ServiceType[] = [
//     new ServiceType(
//         'Plomeria'
//     )
// ]

// export class ServiceTypeRepository implements Repository <ServiceType>{
//     public async findAll(): Promise<ServiceType[] | undefined> {
//         return await serviceTypes
//     }

//     public async findOne(item: { id: string; }): Promise<ServiceType | undefined> {
//         return await serviceTypes.find((serviceType) => serviceType.serviceTypeId === item.id)    
//     }

//     public async add(item: ServiceType): Promise<ServiceType | undefined> {
//         serviceTypes.push(item)
//         return await item
//     }

//     public async update(item: ServiceType): Promise<ServiceType | undefined> {
//         const serviceTypeIdx = serviceTypes.findIndex((serviceType) =>serviceType.serviceTypeId = item.serviceTypeId)

//         if(serviceTypeIdx !== -1) {
//             serviceTypes[serviceTypeIdx] = {...serviceTypes[serviceTypeIdx], ...item}
//         }

//         return await serviceTypes[serviceTypeIdx]
//     }

//     public async remove(item: { id: string}): Promise<ServiceType | undefined> {
//         const serviceTypeIdx = serviceTypes.findIndex((serviceType) =>serviceType.serviceTypeId === item.id);
//         if(serviceTypeIdx !== -1) {
//             const deletedServiceType = serviceTypes[serviceTypeIdx]
//             serviceTypes.splice(serviceTypeIdx, 1)
//             return deletedServiceType
//         }

//         return await serviceTypes[serviceTypeIdx]
//     }
// }