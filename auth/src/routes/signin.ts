import express, { NextFunction, Request, Response } from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../middleware/validation-request'
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'
import { Password } from '../services/password'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/api/users/signin',[
    body('email')
        .isEmail()
        .withMessage('Email is not valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required'),
        validateRequest
], 
async (req: Request, res: Response, next: NextFunction) => {
    //validateRequest function could also go here
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    
    if(!existingUser) {
        throw new BadRequestError('Invalid credentials')
    }

    const passwordMatch = await Password.compare(existingUser.password, password)
    if(!passwordMatch) {
        throw new BadRequestError('Invalid credentials')
    }

    // Create json web token
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    },
        process.env.jwt_key!
    )
    // store it on session object
    req.session = {
        jwt: userJwt
    }


    res.status(200).send(existingUser)
})

export { router as signinRouter }