import { Types } from 'mongoose';
import Comment from '../../mongo/models/Comment'
import { IComment, IPost } from "../../util/types"
import PostModel from '../../mongo/models/Post'
import ResourceNotFoundError from '../../util/errors/ResourceNotFound';

type TCommentData = Omit<IComment, 'id'> & { postId: string }

export const createComment = async (commentdata: TCommentData) => {

    const { postId, title, text, authorUsername } = commentdata
    const postDoc = await PostModel.findById(postId)
    if (!postDoc) throw new ResourceNotFoundError({
        name: 'Post',
        key: 'id',
        value: postId
    })

    const plainComment: IComment = {
        title,
        text,
        authorUsername,
        id: postDoc._id.toString()
    }

    const commentDoc = new Comment(plainComment)
    postDoc.comments.push(commentDoc)

    await Promise.all([commentDoc.save(), postDoc.save()])

    return plainComment
}

export const getCommentsFromSpecificPost = async (postId: string) => {

    const postDoc = await PostModel.findById(postId).populate<
        { comments: (IComment & { _id: Types.ObjectId; })[] }
    >('comments')

    if (!postDoc) throw new ResourceNotFoundError({
        name: 'Post',
        key: 'id',
        value: postId
    })

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

    return plainPost
}