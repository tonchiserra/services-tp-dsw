import crypto from 'node:crypto'

export class Direction {
  constructor(
    public street: string,
    public strNumber: number,
    public country: string,
    public city: string,
    public directionId = crypto.randomUUID()
  ) {}
}