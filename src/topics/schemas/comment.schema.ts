import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
    topic_id: {type: 'ObjectId', ref: 'Topic', index: true},
    parent_id: {type: 'ObjectId', ref: 'Comment', index: true},
    comments: [{type: 'ObjectId', ref: 'Comment', index: true}],
    text: {type: String, required: true},

    createdBy: {type: {id: {type: 'ObjectId', ref: 'User'}, name: String}},
    createdAt: {type: Date, default: Date.now},
    modifiedAt: {type: Date, default: Date.now},

    updateHistory: [{text: {type: String, required: true}, updatedAt: {type: Date}}],
});
