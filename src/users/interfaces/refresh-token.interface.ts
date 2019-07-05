import {Document} from 'mongoose';

export interface IRefreshToken extends Document {
    readonly _id?: string
    readonly user_id?: string
    readonly token?: string
    readonly createdAt?: Date;
}
