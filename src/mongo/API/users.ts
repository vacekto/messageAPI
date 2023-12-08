import { TUtilMiddleware, IUser } from "../../util/types"
import UserModel from '../../mongo/models/User'
import ResourceNotFoundError from "../../util/errors/ResourceNotFound"


interface IGetUserFilter {
    username?: string,
    email?: string
}

export const getUser = async (userFilter: IGetUserFilter) => {

    const userDoc = await UserModel.findOne(userFilter)

    if (!userDoc) throw new ResourceNotFoundError({
        name: 'User',
        key: 'email/username',
        value: `${userFilter.email}/${userFilter.username}`
    })

    const plainUser: IUser = {
        email: userDoc.email,
        password: userDoc.password,
        username: userDoc.username
    }

    return plainUser
}

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
