import { TErrorMiddleware } from "../util/types"


// TODO: status code and response should be more elaborative
const handleMongooseErrors: TErrorMiddleware = (err, req, res, next) => {
    
    if(['ValidationError', 'MongoServerError'].includes(err.name)){
        res.status(400).send('validation error')
        return
    }

    next(err)
}

const errorHandler: TErrorMiddleware[] = [
    handleMongooseErrors
]

export default errorHandler