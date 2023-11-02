import { ObjectId } from "mongodb"

export interface Repository<T> {
    findAll(): Promise<T[] | undefined>
    findOne(item: { id: ObjectId }): Promise<T | undefined>
    add(item: T): Promise<T | undefined>
    update(item: T): Promise<T | undefined>
    remove(item: { id: ObjectId }): Promise<T | undefined>
}