import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'
import request from 'supertest'
import jwt from 'jsonwebtoken'


declare global {
    namespace NodeJS {
        interface Global {
            signup(): string[]
        }
    }
}

let mongo: any

/**
 * Function will execute before test script will start
 */
beforeAll(async () => {
    process.env.jwt_key = 'randomstring'
    mongo = new MongoMemoryServer()
    const mongoUri = await mongo.getUri()

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})

/**
 * Function will delete all db collections before each test case
 */
beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()
    for (let collection of collections) {
        collection.deleteMany({})
    }
})

/**
 * Function will stop db connection after all tests are executed
 */
afterAll(async () => {
    await mongo.stop()
    await mongoose.connection.close()
})

global.signup = () => { 
    const payload = {
        id: '34545',
        email: 'df@gmail.com'
    }

    const token = jwt.sign(payload, process.env.jwt_key!)

    const session = { jwt: token }
    const sessionToJSON = JSON.stringify(session)

    const base64 = Buffer.from(sessionToJSON).toString('base64')

    return [`express:sess=${base64}`]
}