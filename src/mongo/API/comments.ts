import Comment from '../../mongo/models/Comment'
import { IComment } from "../../util/types"
import PostModel from '../../mongo/models/Post'
import ResourceNotFoundError from '../../util/errorClasses/ResourceNotFound';
import CommentModel from '../../mongo/models/Comment';
import UserModel from '../models/User';

type TCommentData = Omit<IComment, '_id'> & { postId: string }

export const createComment = async (commentdata: TCommentData) => {

    const { postId, title, text, authorUsername } = commentdata

    const [post, author] = await Promise.all([
        PostModel.findById(postId),
        UserModel.findOne({ username: authorUsername })
    ])

    if (!post) throw new ResourceNotFoundError({
        resourceName: 'Post',
        propKey: 'id',
        propValue: postId
    })

    if (!author) throw new ResourceNotFoundError({
        resourceName: 'User',
        propKey: 'username',
        propValue: authorUsername
    })

    const plainComment: IComment = {
        title,
        text,
        authorUsername,
        _id: post._id.toString()
    }

    const comment = new Comment(plainComment)
    post.comments.push(comment)

    await Promise.all([comment.save(), post.save()])

    return comment
}

export const getCommentsFromSpecificPost = async (postId: string) => {

    const post = await PostModel.findById(postId)
        .lean().populate<{ comments: IComment[] }>('comments')

    if (!post) throw new ResourceNotFoundError({
        resourceName: 'Post',
        propKey: 'id',
        propValue: postId
    })

    return post
}

export const getCommentById = async (commentId: string) => {

    const comment: IComment | null = await PostModel.findById(commentId).lean()

    if (!comment) throw new ResourceNotFoundError({
        resourceName: 'Comment',
        propKey: 'id',
        propValue: commentId
    })

    return comment
}

export const deleteCommentById = async (id: string) => {

    await CommentModel.findByIdAndDelete(id)
}