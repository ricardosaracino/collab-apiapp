import * as mongoose from 'mongoose';

export const TopicSchema = new mongoose.Schema({
    title: String,
    description: String,
});
