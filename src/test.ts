import { z } from 'zod'
console.log('zod testing')

const UserSchema = z.object({
    username: z.string()
})

type TUser = z.infer<typeof UserSchema>

const user = {
    username: '8'
}

console.log(UserSchema.parse(user))

export default 'hahaha'