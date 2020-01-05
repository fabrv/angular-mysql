import express, { Router } from 'express'
import { createServer, Server } from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as mysql from 'mysql'

class App {
    public server: any
    public app: express.Application

    
    connection: mysql.Connection = mysql.createConnection({
        host: process.env.MYSQL_HOST || '172.17.0.2',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'password',
        database: process.env.MYSQL_DATABASE || 'test'
    })

    constructor () {
        this.app = express()

        // Use bodyparser
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        // Mount Routes
        this.mountRoutes()

        this.server = createServer(this.app)
    }

    private mountRoutes(): void {
        const router: any = express.Router()

        // CORS module to allow cross origin resource sharing
        router.use(cors())

        router.get('/', (req: express.Request, res: express.Response) => {
            res.send('true')
        })

        // Set router location
        this.app.use('/', router)
    }
}

export default new App()