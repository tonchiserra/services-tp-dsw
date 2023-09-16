import express from 'express';
import { addressRouter } from './Address/address.routes.js'

const app = express()
const PORT = Number(process.env.PORT) || 3000

app.use(express.json())

app.use('/api/addresses', addressRouter)
// this.app.use('/api/users', userRoutes)

app.use('/*', (_, res) => res.sendStatus(404))

app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}/`)
})