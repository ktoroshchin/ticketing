import express, { NextFunction, Request, Response } from 'express'
import { body } from 'express-validator'
import { BadRequestError, validateRequest } from '@ktticketing/common'
import { User } from '../models/user'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min:4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters'),
    validateRequest
    ],
    async (req: Request, res: Response, next: NextFunction) => {
        //validateRequest function could also go here
        const { email, password } = req.body
        //Check if email already exist
        const existingUser = await User.findOne({ email })

        if(existingUser){
            throw new BadRequestError('Email in use')
        }

        const user = User.build({ email, password })
        await user.save()

        // Create json web token
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        },
            process.env.jwt_key!
        )

        // store it on session object
        req.session = {
            jwt: userJwt
        }

        res.status(201).send({ user })
    }
)

export { router as signupRoute }

