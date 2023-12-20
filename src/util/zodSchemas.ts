import { z } from 'zod'

export const JWTPayloadZodSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    iat: z.number(),
    exp: z.number()
})

export const loginDataZodSchema = z.object({
    username: z.string(),
    password: z.string(),
})

export const emailSchema = z.string().email()