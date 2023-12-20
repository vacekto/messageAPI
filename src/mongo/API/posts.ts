import { IPost, IComment } from "../../util/types"
import PostModel from '../../mongo/models/Post'
import ResourceNotFoundError from "../../util/errorClasses/ResourceNotFound";
import UserModel from "../models/User";

export const createPost = async (postData: Omit<IPost, '_id'>) => {

    const user = await UserModel.findOne({ username: postData.authorUsername }).lean()
    
    if (!user) throw new ResourceNotFoundError({
        resourceName: 'User',
        propKey: 'username',
        propValue: postData.authorUsername
    })

    const post = new PostModel(postData)
    await post.save()

    return post
}

export const getPostById = async (postId: string) => {

    const post: IPost | null = await PostModel.findById(postId)
        .lean().populate<{ comments: IComment[] }>('comments')

    if (!post) throw new ResourceNotFoundError({
        resourceName: 'Post',
        propKey: 'id',
        propValue: postId
    })

    return post
}

export const geAllPosts = async () => {

    const posts: IPost[] = await PostModel.find()
        .lean().populate<{ comments: IComment[] }>('comments')

    return posts
}

export const deletePostById = async (id: string) => {
    await PostModel.findByIdAndDelete(id)
}