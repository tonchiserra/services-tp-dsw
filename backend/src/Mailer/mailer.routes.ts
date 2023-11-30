import { Router } from 'express'

import { submitMail } from './mailer.controller.js'
import { checkBodyMail } from './mailer.middlewares.js'

const mailerRouter = Router()

mailerRouter.post('/quickcontact', checkBodyMail, submitMail)

export { mailerRouter }