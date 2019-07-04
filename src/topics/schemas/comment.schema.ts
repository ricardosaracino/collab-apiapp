import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
    topic_id: {type: 'ObjectId', ref: 'Topic', required: true, index: true},
    parent_id: {type: 'ObjectId', ref: 'Comment', index: true},
    comments: [{type: 'ObjectId', ref: 'Comment', index: true}],
    text: {type: String, required: true},

    createdBy: {type: {id: {type: 'ObjectId', ref: 'User', required: true}, name: String}},
    createdAt: {type: Date, default: Date.now},
    modifiedAt: {type: Date, default: Date.now},

    updateHistory: [{text: {type: String, required: true}, updatedAt: {type: Date}}],

    upVotes: [{id: {type: 'ObjectId', ref: 'User', required: true}, name: String}],
    downVotes: [{id: {type: 'ObjectId', ref: 'User', required: true}, name: String}],
});
