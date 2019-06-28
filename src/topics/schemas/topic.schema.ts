import * as mongoose from 'mongoose';

export const TopicSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    createdBy: {type: {id: {type: 'ObjectId', ref: 'User'}, name: String}},
});
