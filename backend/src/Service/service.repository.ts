import { Repository } from '../shared/repository.js'
import { Service } from './service.entity.js'

const services: Service[] = [
    new Service(
        "1 Page web",
        580
    )
] // our temporally ddbb

export class ServiceRepository implements Repository<Service>{
    public findAll(): Service[] | undefined {
        return services // call to ddbb
    }
    
    public findOne(item: {id: string}): Service | undefined {
        return services.find((service) => service.serviceId === item.id) // call to ddbb
    }
    
    public add(item: Service): Service | undefined {
        services.push(item) // call to ddbb
        return item
    }
    
    public update(item: Service): Service | undefined {
        const serviceIdx = services.findIndex((service) =>service.serviceId = item.serviceId)

        if(serviceIdx !== -1) {
            services[serviceIdx] = {...services[serviceIdx], ...item}
        }

        return services[serviceIdx]
    }
    
    public remove(item: { id: string}): Service | undefined {
        const serviceIdx = services.findIndex((service) =>service.serviceId === item.id);
        if(serviceIdx !== -1) {
            const deletedService = services[serviceIdx]
            services.splice(serviceIdx, 1)
            return deletedService
        }

        return services[serviceIdx]
    }
} 