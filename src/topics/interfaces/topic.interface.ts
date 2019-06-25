import {Document, Types} from 'mongoose';

export interface Topic extends Document {
    readonly _id?: Types.ObjectId;
    readonly title?: string;
    readonly description?: string;
    readonly createdAt?: Date;
}
