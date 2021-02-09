import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRoute } from './routes/signup'
import { errorHandler, NotFoundError } from '@ktticketing/common'
import cookieSession from 'cookie-session'

const app = express()
//Traffic is going through ingress-nginx, so trust it
app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({
    //do not encrypt, cause JWT is encrypted
    signed: false,
    //must be on https connection
    secure: process.env.NODE_ENV !== 'test'
}))
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRoute)

app.all('*', async(req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)

export { app }