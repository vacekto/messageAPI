import { TErrorMiddleware } from "../util/types"
import mongoose from "mongoose"
import { MongoError, MongoServerError, } from 'mongodb';
import ResourceNotFoundError from '../util/errors/ResourceNotFound'

const handleCustomErrors: TErrorMiddleware = (err, req, res, next) => {
    if (err instanceof ResourceNotFoundError) {
        res.status(404).send(err.message)
        return
    }

    next(err)
}

// TODO: find error classes, interfaces IUniqueError and ICastError are just patchwork solution
const handleMongooseErrors: TErrorMiddleware = (err, req, res, next) => {

    if (err instanceof mongoose.Error.ValidationError) {
        const errMessages = Object.values(err.errors).map(val => val.message)
        const customError = { errMessages }
        res.status(400).send(customError)
        return
    }

    // catches property uniqueness errors
    if (err instanceof MongoServerError && err.code === 11000) {


        interface IUniqueError extends MongoError {
            keyValue: { [prop: string]: any }
        }

        const uniqueErr = err as IUniqueError
        const propTaken = Object.keys(uniqueErr.keyValue)[0]
        const value = uniqueErr.keyValue[propTaken]
        const customError = {
            ErrorMessage: `${propTaken} '${value}' is already taken`
        }

        res.status(400).send(customError)
        return


    }

    if (err.name === 'CastError') {
        interface ICastError extends MongoError {
            path: string,
            value: string
        }

        const castErr = err as ICastError

        const customError = {
            ErrorMessage: `invalid ${castErr.path}: '${castErr.value}'`
        }

        res.status(400).send(customError)
        return
    }

    next(err)
}

const errorHandler: TErrorMiddleware[] = [
    handleMongooseErrors,
    handleCustomErrors
]

export default errorHandler