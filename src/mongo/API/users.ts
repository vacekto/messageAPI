import { TUtilMiddleware, IUser } from "../../util/types"
import UserModel from '../../mongo/models/User'

export const createUser = async (userData: IUser) => {

    const userDoc = new UserModel(userData)

    await userDoc.save()

    const plainUser: IUser = {
        username: userDoc.username,
        email: userDoc.email,
        password: ''
    }

    return plainUser
}

