import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRoute } from './routes/signup'
import { errorHandler } from './middleware/error-handler'
import { NotFoundError } from './errors/not-found-error'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

const app = express()
//Traffic is going through ingress-nginx, so trust it
app.set('trust proxy', true)

app.use(json())
app.use(cookieSession({
    //do not encrypt, cause JWT is encrypted
    signed: false,
    //must be on https connection
    secure: true
}))
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRoute)

app.all('*', async(req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)

const start = async () => {
    if(!process.env.jwt_key) {
        throw new Error('jwt_key must be defined')
    }
    
    try { 
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('connected to mongodb')
    } catch (err) {
        console.error(err)
    }
}

app.listen(3000, () => console.log('Listening on port 3000'))
start()