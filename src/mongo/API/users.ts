import { IUser } from "../../util/types"
import UserModel from '../../mongo/models/User'
import ResourceNotFoundError from "../../util/errorClasses/ResourceNotFound"



export const getUserByUsername = async (username: string): Promise<IUser> => {

    const user = await UserModel.findOne({ username })

    if (!user) throw new ResourceNotFoundError({
        resourceName: 'User',
        propKey: 'username',
        propValue: username
    })

    return user
}

export const getUserByEmail = async (email: string): Promise<IUser> => {

    const user = await UserModel.findOne({ email })

    if (!user) throw new ResourceNotFoundError({
        resourceName: 'User',
        propKey: 'email',
        propValue: email
    })

    return user
}

export const createUser = async (userData: IUser): Promise<IUser> => {

    const user = new UserModel(userData)

    await user.save()

    return user
}
