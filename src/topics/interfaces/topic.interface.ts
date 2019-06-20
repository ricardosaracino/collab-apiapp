import {Document} from 'mongoose';

export interface Topic extends Document {
    readonly title: string;
    readonly description: string;
    readonly createdAt: Date;
}
