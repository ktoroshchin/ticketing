import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'

/**
 * Middleware function checks for errors occured during validation
 * @param req Request object
 * @param res Response object
 * @param next Function to proccess next function execution
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
    }
    
    next()
}