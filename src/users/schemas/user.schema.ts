import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    thirdPartyId: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    provider: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});
