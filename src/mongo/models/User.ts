import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import { emailSchema } from '../../util/zodSchemas';
import { IUser } from '../../util/types';
const { Schema } = mongoose;

const userSchema = new Schema<IUser>({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function (email: string) {
                return emailSchema.safeParse(email).success
            },
            message: props => `${props.value} is not a valid email!`
        }
    },

    password: {
        type: String,
        required: true
    },
}, { versionKey: false });

userSchema.pre('save', async function () {
    const password = this.password.trim()
    const passwordHash = await bcrypt.hash(password, 10)
    this.password = passwordHash
});

const UserModel = mongoose.model<IUser>("User", userSchema)

export default UserModel