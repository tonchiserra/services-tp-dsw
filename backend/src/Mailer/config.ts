import dotenv from 'dotenv'

dotenv.config()

const config = {
  PORT: process.env.MAILER_SERVICE && Number(process.env.MAILER_SERVICE.split(':')[1]) || 587,
  USER: process.env.MAILER_USER && process.env.MAILER_USER || '',
  PASSWORD: process.env.MAILER_PASSWORD && process.env.MAILER_PASSWORD || '',
  HOST: process.env.MAILER_SERVICE && process.env.MAILER_SERVICE.split(':')[0] || '',
  RECEIVER: process.env.MAILER_RECEIVER && process.env.MAILER_RECEIVER || ''
}

export default config