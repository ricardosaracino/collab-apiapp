import {Document} from 'mongoose';

export interface Comment extends Document {
    readonly text: string;
    readonly createdAt: Date;
}
