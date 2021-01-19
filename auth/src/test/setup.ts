import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'

let mongo: any

/**
 * Function will execute before test script will start
 */
beforeAll(async () => {
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

afterAll(async () => {
    await mongo.stop()
    await mongoose.connection.close()
})