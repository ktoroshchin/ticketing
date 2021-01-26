import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'
import request from 'supertest'


declare global {
    namespace NodeJS {
        interface Global {
            signup(): Promise<string[]> 
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

global.signup = async () => { 
    const email = 'test@test.com'
    const password = 'testtest'

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email,
            password
        })
        .expect(201)

    const cookie = response.get('Set-Cookie')

    return cookie
}