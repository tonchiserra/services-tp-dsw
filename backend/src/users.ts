import crypto from 'node:crypto'

export class User {
  constructor(
    public name: string,
    public surname: string,
    public phone: number,
    public mail: string,
    public username: string,
    public password: string,
    public profileImg: string,
    public description: string,
    //public followersIds: string[], 
    public userId = crypto.randomUUID(),
    //claves foraneas
    //public directionId: string
  ) {}
}