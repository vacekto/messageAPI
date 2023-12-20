import { Router } from 'express'
import * as controllers from '../../../controllers'
import { catchAsyncErrors } from '../../../util/helperFunctions/decorators'

const router = Router()

router.post(
    '/',
    catchAsyncErrors(controllers.newPost)
)

router.get(
    '/',
    catchAsyncErrors(controllers.getAllPosts)
)

router.get(
    '/:post_id',
    catchAsyncErrors(controllers.getPost)
)

router.delete(
    '/:post_id',
    catchAsyncErrors(controllers.deletePost)
)

export default router