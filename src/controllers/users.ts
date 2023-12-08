import { TUtilMiddleware, IUser } from "../util/types"
import UserModel from '../mongo/models/User'
import * as MongoAPI from '../mongo/API'

export const createUser: TUtilMiddleware = async (req, res) => {

    const userData = req.body

    const user = await MongoAPI.createUser(userData)

    res.status(200).send(user)
}

