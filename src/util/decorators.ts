import { TUtilMiddleware } from './types'

// Express version 4 doesn't catch rejected promises in middleware by itself, this decoretor ensures that decorated middleware does.
export const catchAsyncErrors = (middleware: TUtilMiddleware) => (async (req, res, next) => {
    try {
        await middleware(req, res, next)
    } catch (err) {
        next(err)
    }
}) as TUtilMiddleware