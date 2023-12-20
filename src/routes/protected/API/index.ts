import { Router } from 'express'
import commentsRouter from './comments'
import postsRouter from './posts'

const router = Router()

router.use('/posts', postsRouter)
router.use('/comments', commentsRouter)

export default router