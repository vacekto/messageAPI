import { Request, Response, NextFunction } from 'express'

export type TUtilMiddleware = (req: Request, res: Response, next: NextFunction) => void
export type TErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => void

export interface IUser {
    username: string,
    email: string,
    password: string,
}

export interface IComment {
    title: string,
    text: string,
    authorUsername: string,
}

export interface IPost {
    title: string,
    text: string,
    authorUsername: string,
    comments: IComment[]
}
