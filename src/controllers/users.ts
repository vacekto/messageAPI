import bcrypt from 'bcrypt'
import { TUtilMiddleware } from "../util/types"
import * as MongoAPI from '../mongo/API'


export const createUser: TUtilMiddleware = async (req, res) => {

    const userData = req.body

    const user = await MongoAPI.createUser(userData)

    res.status(201).send(user)
}

export const logIn: TUtilMiddleware = async (req, res) => {

    const username = req.body.username
    const password = req.body.password
    const user = await MongoAPI.getUser({ username })

    const isMatch = await bcrypt.compare(password, user.password)
    
    if(isMatch) {
        res.send('success')    
        return
    }

    res.send('failure')

}