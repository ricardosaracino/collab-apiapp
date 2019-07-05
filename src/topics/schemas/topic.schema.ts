import * as mongoose from 'mongoose';

export const TopicSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    tags: [{type: String, required: true}],

    comments: [{type: 'ObjectId', ref: 'Comment', index: true}],

    createdAt: {type: Date, default: Date.now},
    createdBy: {type: {id: {type: 'ObjectId', ref: 'User'}, name: String}},
    modifiedAt: {type: Date, default: Date.now},

    upVotes: [{id: {type: 'ObjectId', ref: 'User', required: true}, name: String}],
    downVotes: [{id: {type: 'ObjectId', ref: 'User', required: true}, name: String}],
});
