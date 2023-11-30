import { Request } from "express"
import nodeMailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

import config from './config.js'

export class MailerRepository {
    public async sendMail(req: Request): Promise<SMTPTransport.SentMessageInfo> {
        try {

            const htmlToSend = `
                <div style="width: 100%;">
                    <div style="width: 75%; margin: 20px auto; padding: 25px 30px; border: 1px solid #dedede; border-radius: 5px; font-size: 14px;">
                        <p style="border-bottom: 1px solid #dedede; margin: 0; margin-bottom: 15px; padding-bottom: 15px;">Alguien quiere contratar tu servicio!</p>
                        <br>
                        <p>
                            Hola ${req.body.nameReceiver},<br>
                            Queremos contarte que ${req.body.nameSender} quiere contratar tu servicio "${req.body.serviceType}" que publicaste en el siguiente post:<br>
                            <br>
                            ${req.body.postContent}
                            <br><br>
                            Detalles:<br>
                            - Email: ${req.body.emailSender}<br>
                            - Nombre: ${req.body.nameSender}<br>
                            - Username: ${req.body.usernameSender}<br>
                            - Dirección: ${req.body.addressSender}<br>
                            <br>
                            - Service: ${req.body.serviceType}<br>
                            - Descripción: ${req.body.serviceDescription}<br>
                            - Precio: $ARS ${req.body.servicePrice}
                        </p>
                    </div>
                </div>
            `

            let transporter = nodeMailer.createTransport({
                host: config.HOST,
                port: config.PORT,
                auth: {
                    user: config.USER,
                    pass: config.PASSWORD
                },
                requireTLS: true
            })

            const mailOptions = {
                from: config.USER,
                to: req.body.emailReceiver,
                subject: `Services TP DSW: Quick contact`,
                html: htmlToSend
            }

            const infoMailer = await transporter.sendMail(mailOptions)

            return infoMailer

        }catch(error) {
            throw error
        }
    }
}