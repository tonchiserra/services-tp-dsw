// import { ObjectId } from 'mongodb'
// import { Repository } from '../shared/repository.js'
// import { Address } from './address.entity.js'

// const addresses: Address[] = [
//     new Address(
//         'Zeballos',
//         1300,
//         'Argentina',
//         'Rosario'
//     )
// ] // our temporally ddbb

// export class AddressRepository implements Repository<Address>{
//     public async findAll(): Promise<Address[] | undefined> {
//         return await addresses // call to ddbb
//     }
    
//     public async findOne(item: {id: ObjectId}): Promise<Address | undefined> {
//         return await addresses.findOne({ _id: item.id }) // call to ddbb
//     }
    
//     public async add(item: Address): Promise<Address | undefined> {
//         addresses.push(item) // call to ddbb
//         return await item
//     }
    
//     public async update(item: Address): Promise<Address | undefined> {
//         const addressIdx = addresses.findIndex((address) =>address._id = item.addressId)

//         if(addressIdx !== -1) {
//             addresses[addressIdx] = {...addresses[addressIdx], ...item}
//         }

//         return await addresses[addressIdx]
//     }
    
//     public async remove(item: { id: string}): Promise<Address | undefined> {
//         const addressIdx = addresses.findIndex((address) =>address.addressId === item.id);
//         if(addressIdx !== -1) {
//             const deletedAddress = addresses[addressIdx]
//             addresses.splice(addressIdx, 1)
//             return await deletedAddress
//         }

//         return await addresses[addressIdx]
//     }
// } 