import { Router } from 'express'
import * as controllers from '../controllers'
import { catchAsyncErrors } from '../util/decorators'


const router = Router()

router.get('/healthCheck', (req, res) => {
    console.log('health check')
    res.status(200).send()
})

router.get(
    '/test',
    catchAsyncErrors(controllers.test)
)

router.post(
    '/register',
    catchAsyncErrors(controllers.createUser)
)


router.post(
    '/comments',
    catchAsyncErrors(controllers.createComment)
)

router.get(
    '/comments/:comment_id',
    catchAsyncErrors(controllers.fetchPosts)
)

router.post(
    '/posts',
    catchAsyncErrors(controllers.createPost)
)

router.get(
    '/posts',
    catchAsyncErrors(controllers.geAllPosts)
)

router.get(
    '/posts/:post_id',
    catchAsyncErrors(controllers.getPostById)
)

export default router