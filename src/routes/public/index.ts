import * as controllers from '../../controllers'
import { Router } from 'express'
import { catchAsyncErrors } from '../../util/helperFunctions/decorators'

const router = Router()

router.post(
    '/register',
    catchAsyncErrors(controllers.createUser)
)

router.post(
    '/login',
    catchAsyncErrors(controllers.logIn)
)

export default router