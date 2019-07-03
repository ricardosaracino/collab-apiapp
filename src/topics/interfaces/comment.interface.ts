import {Document, Types} from 'mongoose';

export interface IComment extends Document {
    readonly _id?: Types.ObjectId;
    readonly text?: string;
    readonly createdBy?: { id: string, name: string }
    readonly createdAt?: Date;
    readonly modifiedAt?: Date;
}
