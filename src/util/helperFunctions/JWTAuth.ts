import jwt from "jsonwebtoken"

export const verifyToken = (token: string) => {
    try {
        const payload = jwt.verify(
            token,
            process.env.AUTH_TOKEN_SECRET as string,
        )
        return { payload }
    } catch (err) {
        return { error: err as Error }
    }
}


export const getTokenPayload = (token: string) => {
    const payloadBase64 = token.split('.')[1]
    const decodedPayload = atob(payloadBase64)
    return JSON.parse(decodedPayload)
}