import mongoose from 'mongoose'
import { app } from './app'

const start = async () => {
    if(!process.env.jwt_key) {
        throw new Error('jwt_key must be defined')
    }
    if(!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined')
    }
    
    try { 
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('connected to auth service mongodb')
    } catch (err) {
        console.error(err)
    }
}

app.listen(3000, () => console.log('Listening on port 3000'))
start()