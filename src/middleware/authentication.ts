import { TUtilMiddleware } from '../util/types'
import jwt, { TokenExpiredError } from "jsonwebtoken"
import NotAuthenticatedError from '../util/errorClasses/NotAuthenticatedError'
import { verifyToken } from '../util/helperFunctions/JWTAuth'


const authenticate: TUtilMiddleware = (req, res, next) => {

    const accessToken = req.header('Authorization')?.split(' ')[1]
    if (!accessToken) throw new NotAuthenticatedError('No access token provided')

    const accessVerifycation = verifyToken(accessToken)

    if (!accessVerifycation.error) {
        next()
        return
    }

    if (!(accessVerifycation.error instanceof TokenExpiredError)) {
        next(new NotAuthenticatedError('Invalid access token'))
        return
    }

    const refreshToken = req.cookies['refresh_token']

    if (!refreshToken) next(new NotAuthenticatedError('no refresh token provided'))

    const refreshVerificanion = verifyToken(refreshToken)

    if (refreshVerificanion.error) {
        next(new NotAuthenticatedError('Invalid refresh token'))
        res.cookie('refresh_token', null)
        return
    }

    const newAccessToken = jwt.sign(
        refreshVerificanion.payload!,
        process.env.AUTH_TOKEN_SECRET as string,
        { expiresIn: 60 * 15 }
    )

    const newRefreshToken = jwt.sign(
        refreshVerificanion.payload!,
        process.env.AUTH_TOKEN_SECRET as string,
        { expiresIn: '7 days' }
    )

    res.setHeader('Authorization', `Bearer ${newAccessToken}`)
    res.cookie(
        'refresh_token',
        newRefreshToken,
        { httpOnly: true, secure: true }
    )

    next()
}

export default authenticate