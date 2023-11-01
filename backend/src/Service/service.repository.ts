import { Repository } from '../shared/repository.js'
import { Service } from './service.entity.js'

const services: Service[] = [
    new Service(
        "1 Page web",
        580
    )
] // our temporally ddbb

export class ServiceRepository implements Repository<Service>{
    public async findAll(): Promise<Service[] | undefined> {
        return await services // call to ddbb
    }
    
    public async findOne(item: {id: string}): Promise<Service | undefined> {
        return await services.find((service) => service.serviceId === item.id) // call to ddbb
    }
    
    public async add(item: Service): Promise<Service | undefined> {
        services.push(item) // call to ddbb
        return await item
    }
    
    public async update(item: Service): Promise<Service | undefined> {
        const serviceIdx = services.findIndex((service) =>service.serviceId = item.serviceId)

        if(serviceIdx !== -1) {
            services[serviceIdx] = {...services[serviceIdx], ...item}
        }

        return await services[serviceIdx]
    }
    
    public async remove(item: { id: string}): Promise<Service | undefined> {
        const serviceIdx = services.findIndex((service) =>service.serviceId === item.id);
        if(serviceIdx !== -1) {
            const deletedService = services[serviceIdx]
            services.splice(serviceIdx, 1)
            return deletedService
        }

        return await services[serviceIdx]
    }
} 