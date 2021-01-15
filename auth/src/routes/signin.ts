import express, { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'
import { validateRequest } from '../middleware/validation-request'
import { User } from '../models/user'

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
(req: Request, res: Response, next: NextFunction) => {
    //validateRequest function could also go here




    res.send({})
})

export { router as signinRouter }