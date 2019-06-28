import {Document, Types} from 'mongoose';

export interface IComment extends Document {
    readonly _id?: Types.ObjectId;
    readonly text?: string;
    readonly createdAt?: Date;
}
