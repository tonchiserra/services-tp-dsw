import { Repository } from "../shared/repository";
import { ServiceType } from "./serviceType.entity.js";

const serviceTypes: ServiceType[] = [
    new ServiceType(
        'Plomeria'
    )
]

export class ServiceTypeRepository implements Repository <ServiceType>{
    public findAll(): ServiceType[] | undefined {
        return serviceTypes
    }

    public findOne(item: { id: string; }): ServiceType | undefined {
        return serviceTypes.find((serviceType) => serviceType.serviceTypeId === item.id)    
    }

    public add(item: ServiceType): ServiceType | undefined {
        serviceTypes.push(item)
        return item
    }

    public update(item: ServiceType): ServiceType | undefined {
        const serviceTypeIdx = serviceTypes.findIndex((serviceType) =>serviceType.serviceTypeId = item.serviceTypeId)

        if(serviceTypeIdx !== -1) {
            serviceTypes[serviceTypeIdx] = {...serviceTypes[serviceTypeIdx], ...item}
        }

        return serviceTypes[serviceTypeIdx]
    }

    public remove(item: { id: string}): ServiceType | undefined {
        const serviceTypeIdx = serviceTypes.findIndex((serviceType) =>serviceType.serviceTypeId === item.id);
        if(serviceTypeIdx !== -1) {
            const deletedServiceType = serviceTypes[serviceTypeIdx]
            serviceTypes.splice(serviceTypeIdx, 1)
            return deletedServiceType
        }

        return serviceTypes[serviceTypeIdx]
    }
}