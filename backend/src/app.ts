import express from 'express';
import cors from 'cors';

import { addressRouter } from './Address/address.routes.js'
import { userRouter } from './User/user.routes.js'
import { postRouter } from './Post/post.routes.js'
import { serviceTypeRouter } from './ServiceType/serviceType.routes.js'
import { serviceRouter } from './Service/service.routes.js'
import { mailerRouter } from './Mailer/mailer.routes.js'

const app = express()
const PORT = Number(process.env.PORT) || 3000

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));

app.use('/api/addresses', addressRouter)
app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/serviceTypes', serviceTypeRouter)
app.use('/api/services', serviceRouter)
app.use('/api/mailer', mailerRouter)

app.use('/*', (_, res) => res.sendStatus(404))

app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}/`)
})