import { TUtilMiddleware, IUser } from "../util/types"
import User from '../mongo/models/User'

export const register: TUtilMiddleware = async (req, res) => {

    const user = req.body

    const newUser = new User(user)

    const createdUser = await newUser.save()

    const plainUser: IUser = {
        username: createdUser.username,
        email: createdUser.email,
        password: ''
    }

    res.status(200).send(plainUser)
}

