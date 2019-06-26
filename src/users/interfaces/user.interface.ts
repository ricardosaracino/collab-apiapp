import {Document} from 'mongoose';

export interface User extends Document {
    readonly thirdPartyId?: string;
    readonly name?: string;
    readonly email?: string;
    readonly provider?: string;
    readonly createdAt?: Date;
}
