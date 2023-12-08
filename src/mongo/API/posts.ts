import { IPost, IComment } from "../../util/types"
import PostModel from '../../mongo/models/Post'
import { Types } from 'mongoose';
import ResourceNotFoundError from "../../util/errors/ResourceNotFound";

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

export const getPostById = async (postId: string) => {

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

export const geAllPosts= async () => {
    
    const postDocs = await PostModel.find().populate<
        { comments: (IComment & { _id: Types.ObjectId; })[] }
    >('comments')



    const plainPosts: IPost[] = postDocs.map(postDoc => {
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

    return plainPosts
}

export const deletePostById = async (id: string) => {
    await PostModel.findByIdAndDelete(id)   
}