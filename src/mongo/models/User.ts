import mongoose from 'mongoose';
import { emailRegex } from '../../util/regex';
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
                return emailRegex.test(email);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },

    password: {
        type: String,
        required: true
    },
});

const UserModel = mongoose.model<IUser>("User", userSchema)

export default UserModel