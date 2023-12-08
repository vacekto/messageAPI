import { Types } from 'mongoose';
import Comment from '../mongo/models/Comment'
import { TUtilMiddleware, IComment, IPost } from "../util/types"
import PostModel from '../mongo/models/Post'
import * as MongoAPI from '../mongo/API'

export const createComment: TUtilMiddleware = async (req, res, next) => {

    const commentData = req.body
    const comment = await MongoAPI.createComment(commentData)

    res.status(200).send(comment)
}

export const fetchPosts: TUtilMiddleware = async (req, res, next) => {

    const postId = req.params.comment_id
    const postDoc = await PostModel.findById(postId).populate<
        { comments: (IComment & { _id: Types.ObjectId; })[] }
    >('comments')

    if (!postDoc) {
        res.status(404).send('Resource not found')
        return
    }

    const plainComments: IComment[] = postDoc.comments.map(comment => {
        return {
            title: comment.title,
            text: comment.text,
            authorUsername: comment.authorUsername,
            id: comment._id.toString()
        }
    })

    const plainPost: IPost = {
        authorUsername: postDoc.authorUsername,
        comments: plainComments,
        text: postDoc.text,
        title: postDoc.title,
        id: postDoc._id.toString()
    }

    res.send(plainPost)
}