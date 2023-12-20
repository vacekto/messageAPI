import { Router } from 'express'

import apiRouter from './API'

const router = Router()

router.use('/API', apiRouter)

export default router
