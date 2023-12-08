import { TUtilMiddleware, IPost, IComment } from "../../util/types"
import PostModel from '../../mongo/models/Post'
import { Types } from 'mongoose';

export const createPost = async (postData: Omit<IPost, 'id'> ) => {

    const postDoc = new PostModel(postData)
    await postDoc.save()

    const plainPost: IPost = {
        authorUsername: postDoc.authorUsername,
        comments: postDoc.comments,
        text: postDoc.text,
        title: postDoc.title,
        id: postDoc._id.toString()
    }

    return plainPost
}

export const getPostById: TUtilMiddleware = async (req, res) => {

    const postId = req.params.post_id
    const postDoc = await PostModel.findById(postId).populate<
        { comments: (IComment & { _id: Types.ObjectId; })[] }
    >('comments')

    if (!postDoc) {
        res.status(400).send('Invalid post id')
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

export const geAllPosts: TUtilMiddleware = async (req, res) => {
    
    const postDocs = await PostModel.find().populate<
        { comments: (IComment & { _id: Types.ObjectId; })[] }
    >('comments')



    const plainPosts = postDocs.map(postDoc => {
        const plainComments: IComment[] = postDoc.comments.map(comment => {
            return {
                id: comment._id.toString(),
                title: comment.title,
                text: comment.text,
                authorUsername: comment.authorUsername
            }
        })

        return {
            authorUsername: postDoc.authorUsername,
            comments: plainComments,
            text: postDoc.text,
            title: postDoc.title,
            id: postDoc._id.toString()
        }
    })

    res.send(plainPosts)
}