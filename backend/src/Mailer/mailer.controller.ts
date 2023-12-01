import { Request, Response } from "express"
import { MailerRepository } from './mailer.repository.js'

const repository = new MailerRepository()

async function submitMail(req: Request, res: Response){

    const infoMailerContact = await repository.sendMail(req)

    if(infoMailerContact.rejected.length > 0) {
        return res.status(400).send({ message: `Email not sent due to: ${infoMailerContact.response}` })
    }

    return res.status(200).json({ data: infoMailerContact })
}
 
export { submitMail }