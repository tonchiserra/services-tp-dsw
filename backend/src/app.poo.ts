import express, { NextFunction, Request, Response } from 'express';

class Server {
    public app: express.Application;
    private PORT: number;

    constructor() {
        this.app = express()
        this.config()
        this.routes()
    }

    private config() {
        this.PORT = 3000 // get it from .env
        this.app.set('PORT', this.PORT)
        this.app.use(express.json())
    }

    private routes() {
        // user
        this.app.get('/api/users', User.getAll)
        this.app.get('/api/users/:userId', User.getById)
        this.app.post('/api/users', User.postByObject)
        this.app.put('/api/users/:userId', User.updateObject)
        this.app.delete('/api/users/:userId', User.deleteObject)

        // address
        // ...

        this.app.use('/*', (_, res) => res.sendStatus(403))
    }
}

const servicesServer = new Server()
servicesServer.listen()
