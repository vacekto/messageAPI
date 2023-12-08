import { TUtilMiddleware, IPost } from "../util/types"
import UserModel from '../mongo/models/User'

export const test: TUtilMiddleware = async (req, res) => {
    console.log('testing')
    const user = await UserModel.findById("6569b58e79c134d91e78fea3").exec()
    const again = await UserModel.findById(user?._id)
    res.send(user?._id)
}