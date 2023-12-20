import mongoose from 'mongoose';

const { Schema } = mongoose;
import { IPost } from '../../util/types';

const postSchema = new Schema<IPost>({

    title: {
        type: String,
        required: true,
        trim: true,
    },

    text: {
        type: String,
        reqired: true,
        trim: true,
    },

    authorUsername: {
        type: String,
        required: true,
        trim: true
    },

    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, { versionKey: false });

const PostModel = mongoose.model<IPost>("Post", postSchema)

export default PostModel