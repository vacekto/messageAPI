import { TUtilMiddleware } from "../util/types"
import * as MongoAPI from "../mongo/API";

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

    const postId = req.params.post_id
    const post = await MongoAPI.getPostById(postId)

    const commentIds = post.comments.map(comment => comment.id)

    await Promise.all([
        ...commentIds.map(id => MongoAPI.deleteCommentById(id)),
        MongoAPI.deletePostById(postId)
    ])

    res.status(204).send()
}
