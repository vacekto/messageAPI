import bcrypt from 'bcrypt'
import { TUtilMiddleware } from "../util/types"
import * as MongoAPI from '../mongo/API'
import jwt from 'jsonwebtoken'
import NotAuthenticatedError from '../util/errorClasses/NotAuthenticatedError'
import { loginDataZodSchema } from '../util/zodSchemas'

export const createUser: TUtilMiddleware = async (req, res) => {

    const userData = req.body
    const user = await MongoAPI.createUser(userData)
    user.password = ''
    
    res.status(201).send(user)
}

export const logIn: TUtilMiddleware = async (req, res) => {

    const loginData = loginDataZodSchema.parse(req.body)
    const user = await MongoAPI.getUserByUsername(loginData.username)

    const isMatch = await bcrypt.compare(loginData.password, user.password)

    if (!isMatch) throw new NotAuthenticatedError('Incorrect password')

    const payload = {
        username: user.username,
        email: user.email
    }

    const accessToken = jwt.sign(
        payload,
        process.env.AUTH_TOKEN_SECRET as string,
        { expiresIn: 60 * 15 }
    )
    const refreshToken = jwt.sign(
        payload,
        process.env.AUTH_TOKEN_SECRET as string,
        { expiresIn: '7 days' }
    )
    res.setHeader('Authorization', `Bearer ${accessToken}`)

    res.cookie(
        'refresh_token',
        refreshToken,
        { httpOnly: true, secure: true }
    )

    res.send({ accessToken: accessToken })
}