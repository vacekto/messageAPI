import { TErrorMiddleware } from "../util/types"
import mongoose from "mongoose"
import { MongoError, MongoServerError, } from 'mongodb';
import ResourceNotFoundError from '../util/errorClasses/ResourceNotFound'
import NotAuthenticatedError from "../util/errorClasses/NotAuthenticatedError";
import NotAuthorizedError from "../util/errorClasses/NotAuthorizedError";

const handleCustomErrors: TErrorMiddleware = (err, req, res, next) => {
    if (err instanceof NotAuthenticatedError) {
        res.status(401).send(err.message)
        return
    }

    if (err instanceof ResourceNotFoundError) {
        res.status(404).send(err.message)
        return
    }

    if (err instanceof NotAuthorizedError) {
        res.status(405).send(err.message)
        return
    }

    next(err)
}

const handleMongooseErrors: TErrorMiddleware = (err, req, res, next) => {

    if (err instanceof mongoose.Error.ValidationError) {
        const errMessages = Object.values(err.errors).map(val => val.message)
        const customError = { errMessages }
        res.status(400).send(customError)
        return
    }

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
    handleCustomErrors,
]

export default errorHandler