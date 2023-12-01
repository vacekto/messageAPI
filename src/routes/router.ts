import { Router } from 'express'
import * as controllers from '../controllers'
import { catchAsyncErrors } from '../util/decorators'


const router = Router()

router.get('/healthCheck', (req, res) => {
    console.log('health check')
    res.status(200).send()
})


router.post(
    '/register',
    catchAsyncErrors(controllers.register)
)

router.post(
    '/comment',
    catchAsyncErrors(controllers.createComment)
)


export default router