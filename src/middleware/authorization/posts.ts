import { getTokenPayload } from "../../util/helperFunctions/JWTAuth"
import { TUtilMiddleware } from "../../util/types"

export const authorizeDeletePost: TUtilMiddleware = (req, res, next) => {
    
    const accessToken = req.header('Authorization')!.split(' ')[1]

    const tokenPayload = getTokenPayload(accessToken)
    const user = tokenPayload
}