import { Repository } from '../shared/repository.js'
import { Address } from './address.entity.js'

const addresses: Address[] = [
    new Address(
        'Zeballos',
        1300,
        'Argentina',
        'Rosario'
    )
] // our temporally ddbb

export class AddressRepository implements Repository<Address>{
    public findAll(): Address[] | undefined {
        return addresses // call to ddbb
    }
    
    public findOne(item: {id: string}): Address | undefined {
        return addresses.find((address) => address.addressId === item.id) // call to ddbb
    }
    
    public add(item: Address): Address | undefined {
        addresses.push(item) // call to ddbb
        return item
    }
    
    public update(item: Address): Address | undefined {
        const addressIdx = addresses.findIndex((address) =>address.addressId = item.addressId)

        if(addressIdx !== -1) {
            addresses[addressIdx] = {...addresses[addressIdx], ...item}
        }

        return addresses[addressIdx]
    }
    
    public remove(item: { id: string}): Address | undefined {
        const addressIdx = addresses.findIndex((address) =>address.addressId === item.id);
        if(addressIdx !== -1) {
            const deletedAddress = addresses[addressIdx]
            addresses.splice(addressIdx, 1)
            return deletedAddress
        }

        return addresses[addressIdx]
    }
} 