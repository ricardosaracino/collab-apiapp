import {Document} from 'mongoose';

export interface IUser extends Document {
    readonly _id?: string
    readonly thirdPartyId?: string;
    readonly name?: string;
    readonly email?: string;
    readonly provider?: string;
    readonly createdAt?: Date;
}
