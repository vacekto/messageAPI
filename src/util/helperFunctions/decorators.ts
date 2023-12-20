import { TUtilMiddleware } from '../types'
import { Request, Response, NextFunction } from 'express'

// Express version 4 doesn't catch rejected promises in middleware by itself, this decoretor ensures that decorated middleware does.
export const catchAsyncErrors = (middleware: TUtilMiddleware) => {
    return (async (req: Request, res: Response, next: NextFunction) => {
    try {
        await middleware(req, res, next)
    } catch (err) {
        next(err)
    }
})}