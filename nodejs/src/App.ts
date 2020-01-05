import express, { Router } from 'express'
import { createServer, Server } from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
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
    this.app.use(express.static(path.resolve(__dirname, '../view')))

    this.connection.connect()

    // Use bodyparser
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    // Mount Routes
    this.mountRoutes()

    this.server = createServer(this.app)
  }

  private mountRoutes(): void {
    const router: express.Router = express.Router()

    // CORS module to allow cross origin resource sharing
    router.use(cors())

    router.get('/users', (req: express.Request, res: express.Response) => {
      this.connection.query('SELECT * FROM `users`;', (error: mysql.MysqlError, results: object, fields: mysql.FieldInfo) => {
        if (error) throw error
        res.send(results)
      })
    })

    router.post('/users', (req: express.Request, res: express.Response) => {
      const fields = ['name', 'lastname', 'civilState', 'CUI']
      let allFieldsInBody = true
      let fieldsCount = 0

      for (const el in req.body) {
        if (!fields.includes(el)) {
          allFieldsInBody = false
          break
        } else fieldsCount++
      }

      console.log(req.body)

      if (allFieldsInBody && fieldsCount === fields.length) {
        this.connection.query(`INSERT INTO \`users\` VALUES (null, '${JSON.stringify(req.body)}');`, (error: mysql.MysqlError, results: object, fields: mysql.FieldInfo) => {
          if (error) res.status(500).send({ msg:'Internal server error', data: error })
          res.send(results)
        })
      } else {
        res.status(400).send({ msg: 'Incorrect request body'} )
      }
    })

    router.delete('/users', (req: express.Request, res: express.Response) => {
      req.body.id = req.body.id || 0
      this.connection.query(`DELETE FROM \`users\` WHERE id=${req.body.id};`, (error: mysql.MysqlError, results: object, fields: mysql.FieldInfo) => {
        if (error) throw error
        res.send(results)
      })
    })

    router.patch('/users', (req: express.Request, res: express.Response) => {
      const fields = ['name', 'lastname', 'civilState', 'CUI']
      let allFieldsInBody = true
      let fieldsCount = 0

      for (const el in req.body) {
        if (!fields.includes(el)) {
          allFieldsInBody = false
          break
        } else fieldsCount++
      }

      req.query.id = req.query.id || 0

      if (allFieldsInBody && fieldsCount === fields.length) {
        this.connection.query(`UPDATE \`users\` SET data = '${JSON.stringify(req.body)}' WHERE id=${req.query.id};`, (error: mysql.MysqlError, results: object, fields: mysql.FieldInfo) => {
          if (error) res.status(500).send({ msg:'Internal server error', data: error })
          res.send(results)
        })
      } else {
        res.status(400).send({ msg: 'Incorrect request body'} )
      }
    })

    // Set router location
    this.app.use('/', router)
  }
}

export default new App()
