import { TJWTPayload, TUtilMiddleware } from "../util/types"
import * as MongoAPI from '../mongo/API'
import { getTokenPayload } from "../util/helperFunctions/JWTAuth"
import NotAuthorizedError from "../util/errorClasses/NotAuthorizedError"

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

    const accessToken = req.header('Authorization')!.split(' ')[1]

    const tokenPayload: TJWTPayload = getTokenPayload(accessToken)

    const id = req.params.comment_id
    const comment = await MongoAPI.getCommentById(id)

    if(comment.authorUsername !== tokenPayload.username){
        throw new NotAuthorizedError()
    }

    await MongoAPI.deleteCommentById(id)

    res.status(204).send('Comment deleted successfully')
}