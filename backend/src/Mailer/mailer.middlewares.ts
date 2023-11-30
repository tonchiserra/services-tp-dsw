import { NextFunction, Request, Response } from "express"

function checkBodyMail(req: Request, res: Response, next: NextFunction) {
    if(!!!req.body.emailReceiver) return res.status(400).send({ message: 'Please, send right info.' })

    next()
}

export { checkBodyMail }
