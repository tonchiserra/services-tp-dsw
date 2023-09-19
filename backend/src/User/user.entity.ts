import crypto from 'node:crypto'

export class User {
    constructor(
        public nameSurname: string,
        public phone: number,
        public mail: string,
        public username: string,
        public password: string,
        public profileImg: string,
        public description: string,
        public userId = crypto.randomUUID()
    ) {}
}