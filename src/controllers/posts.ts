import { TJWTPayload, TUtilMiddleware } from "../util/types"
import * as MongoAPI from "../mongo/API";
import { getTokenPayload } from "../util/helperFunctions/JWTAuth";
import NotAuthenticatedError from "../util/errorClasses/NotAuthenticatedError";
import { JWTPayloadZodSchema } from "../util/zodSchemas";
import NotAuthorizedError from "../util/errorClasses/NotAuthorizedError";

export const newPost: TUtilMiddleware = async (req, res) => {

    const postData = req.body
    const post = await MongoAPI.createPost(postData)

    res.status(201).send(post)
}

export const getPost: TUtilMiddleware = async (req, res) => {

    const postId = req.params.post_id
    const post = await MongoAPI.getPostById(postId)

    res.status(200).send(post)
}

export const getAllPosts: TUtilMiddleware = async (req, res) => {

    const posts = await MongoAPI.geAllPosts()

    res.status(200).send(posts)
}

export const deletePost: TUtilMiddleware = async (req, res) => {

    const accessToken = req.header('Authorization')!.split(' ')[1]

    const tokenPayload: TJWTPayload = getTokenPayload(accessToken)

    const postId = req.params.post_id
    const post = await MongoAPI.getPostById(postId)

    if (post.authorUsername !== tokenPayload.username)
        throw new NotAuthorizedError()

    const commentIds = post.comments.map(comment => comment._id)

    await Promise.all([
        ...commentIds.map(id => MongoAPI.deleteCommentById(id)),
        MongoAPI.deletePostById(postId)
    ])

    res.status(204).send('Post deleted successfully')
}
