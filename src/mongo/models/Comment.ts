import mongoose from 'mongoose';
const { Schema } = mongoose;
import { IComment } from '../../util/types'

const commentSchema = new Schema<IComment>({

    title: {
        type: String,
        required: true,
        trim: true,
    },

    text: {
        type: String,
        required: true,
        trim: true,
    },

    authorUsername: {
        type: String,
        required: true,
        trim: true
    },

}, { versionKey: false });

const commentModel = mongoose.model<IComment>("Comment", commentSchema)

export default commentModel