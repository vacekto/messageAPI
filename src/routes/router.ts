import { Router } from 'express'
import * as controllers from '../controllers'
import { catchAsyncErrors } from '../util/decorators'


// TODO: create folder structure

const router = Router()

router.get('/healthCheck', (req, res) => {
    console.log('health check')
    res.status(200).send()
})

router.post(
    '/register',
    catchAsyncErrors(controllers.createUser)
)

router.post(
    '/login',
    catchAsyncErrors(controllers.logIn)
)

router.delete(
    '/comments/:comment_id',
    catchAsyncErrors(controllers.deleteComment)
)

router.post(
    '/comments',
    catchAsyncErrors(controllers.addComment)
)

router.get(
    '/comments/:post_id',
    catchAsyncErrors(controllers.fetchComments)
)

router.post(
    '/posts',
    catchAsyncErrors(controllers.newPost)
)

router.get(
    '/posts',
    catchAsyncErrors(controllers.getAllPosts)
)

router.get(
    '/posts/:post_id',
    catchAsyncErrors(controllers.getPost)
)

router.delete(
    '/posts/:post_id',
    catchAsyncErrors(controllers.deletePost)
)

export default router