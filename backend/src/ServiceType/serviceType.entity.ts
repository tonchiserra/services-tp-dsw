import crypto from 'node:crypto'

export class ServiceType {
    constructor(
        public name: string,
        public serviceTypeId = crypto.randomUUID()
    ) {}
}