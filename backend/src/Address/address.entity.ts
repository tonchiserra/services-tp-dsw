import crypto from 'node:crypto'

export class Address {
    constructor(
        public street: string,
        public streetNumber: number,
        public country: string,
        public city: string,
        public addressId = crypto.randomUUID()
    ) {}
}