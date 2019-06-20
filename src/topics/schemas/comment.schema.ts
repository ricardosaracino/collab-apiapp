import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
    topic_id: {type: 'ObjectId', ref: 'Topic'},
    text: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});
