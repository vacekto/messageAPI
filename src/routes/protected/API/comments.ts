import { Router } from 'express'
import * as controllers from '../../../controllers'
import { catchAsyncErrors } from '../../../util/helperFunctions/decorators'

const router = Router()

router.delete(
    '/:comment_id',
    catchAsyncErrors(controllers.deleteComment)
)

router.post(
    '/',
    catchAsyncErrors(controllers.addComment)
)

router.get(
    '/:post_id',
    catchAsyncErrors(controllers.fetchComments)
)

export default router