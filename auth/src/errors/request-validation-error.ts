import { ValidationError } from 'express-validator'
import { CustomError } from './custom-errors'

export class RequestValidationError extends CustomError {
    statusCode = 400

    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters')

        // Only becasue we are extending a built in class in 
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors(){
        return this.errors.map(err => {
            return { message: err.msg, field: err.param }
        }) 
    }
}