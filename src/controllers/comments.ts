import Comment from '../mongo/models/Comment'
import { TUtilMiddleware, IComment } from "../util/types"
import UserModel from '../mongo/models/User'
import PostModel from '../mongo/models/Post'

export const createComment: TUtilMiddleware = async (req, res, next) => {

    const { postID, title, text, authorUsername } = req.body

    const plainComment = { title, text, authorUsername } as IComment

    const [postDoc, authorDoc] = await Promise.all([
        UserModel.findOne({ username: authorUsername }),
        PostModel.findById(postID),
    ])

    if (!postDoc || !authorDoc) throw new Error('bad input')

    const newComment = new Comment(plainComment)

    const commentDoc = await newComment.save()

    // add comment to post commensts, save

    res.status(200).send(plainComment)
}