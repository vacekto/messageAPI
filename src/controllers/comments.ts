import { Types } from 'mongoose';
import { TUtilMiddleware, IComment, IPost } from "../util/types"
import PostModel from '../mongo/models/Post'
import * as MongoAPI from '../mongo/API'

export const addComment: TUtilMiddleware = async (req, res, next) => {

    const commentData = req.body
    const comment = await MongoAPI.createComment(commentData)

    res.status(201).send(comment)
}

export const fetchComments: TUtilMiddleware = async (req, res, next) => {

    const postId = req.params.post_id
    const post = await MongoAPI.getCommentsFromSpecificPost(postId)

    res.status(200).send(post)
}

export const deleteComment: TUtilMiddleware = async (req, res, next) => {
    
    const id = req.params.comment_id
    await MongoAPI.deleteCommentById(id)

    res.status(204).send('Resource deleted successfully')
}