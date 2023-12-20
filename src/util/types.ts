import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import * as zSchemas from './zodSchemas'

export type TLoginData = z.infer<typeof zSchemas.loginDataZodSchema>
export type TJWTPayload = z.infer<typeof zSchemas.JWTPayloadZodSchema>


export type TUtilMiddleware = (req: Request, res: Response, next: NextFunction) => void
export type TErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => void


export interface IUser {
    _id: string,
    username: string,
    email: string,
    password: string
}

export interface IComment {
    title: string,
    text: string,
    authorUsername: string,
    _id: string
}

export interface IPost {
    title: string,
    text: string,
    authorUsername: string,
    comments: IComment[],
    _id: string
}

export interface ITokenPayload {
    username: string,
    email: string
}
