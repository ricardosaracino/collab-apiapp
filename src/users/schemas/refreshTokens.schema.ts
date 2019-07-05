import * as mongoose from 'mongoose';

export const RefreshTokenSchema = new mongoose.Schema({
    user_id: {type: 'ObjectId', ref: 'User', required: true},
    refreshTokenHash: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});
