import crypto from 'node:crypto'

export class Service {
    constructor(
        public description: string,
        public price: number,
        public serviceId = crypto.randomUUID()
    ) {}
}