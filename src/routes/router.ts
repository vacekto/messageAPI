import { Router } from 'express'
import protectedRoutes from './protected'
import publicRoutes from './public'
import authenticate from '../middleware/authentication'
import { getTokenPayload } from '../util/helperFunctions/JWTAuth'
import { JWTPayloadZodSchema } from '../util/zodSchemas'

const router = Router()


router.get('/healthCheck',
    (req, res, next) => {

        const accessToken = req.header('Authorization')!.split(' ')[1]
        const tokenPayload = getTokenPayload(accessToken)
        console.log(tokenPayload)
        JWTPayloadZodSchema.parse(tokenPayload)


        console.log('health check')
        res.status(200).send('OK')
    })

router.use(publicRoutes)
router.use(authenticate, protectedRoutes)

export default router