import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';

import * as crypto from 'crypto';
import {Model, Types} from 'mongoose';
import {IRefreshToken} from './interfaces/refresh-token.interface';
import {IUser} from './interfaces/user.interface';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly UserModel: Model<IUser>,
                @InjectModel('RefreshToken') private readonly RefreshTokenModel: Model<IRefreshToken>) {
    }

    public async createUser(user: IUser): Promise<IUser> {
        const createdUser = new this.UserModel(user);
        return await createdUser.save();
    }

    public async findUserById(id: string): Promise<IUser> {
        return await this.UserModel.findById(id).exec();
    }

    public async findOneByThirdPartyId(thirdPartyId: string): Promise<IUser> {
        return await this.UserModel.findOne({thirdPartyId}).exec();
    }

    public async setUserRefreshToken(user: IUser, refreshToken: string): Promise<void> {

        const refreshTokenHash = crypto.createHash('sha512').update(refreshToken).digest('base64');

        await this.RefreshTokenModel.updateOne({user_id: Types.ObjectId(user._id)}, {refreshTokenHash}, {upsert: true}).exec();
    }

    public async findUserRefreshToken(refreshToken: string): Promise<IRefreshToken> {

        const refreshTokenHash = crypto.createHash('sha512').update(refreshToken).digest('base64');

        return await this.RefreshTokenModel.findOne({refreshTokenHash}).exec();
    }

    public async deleteUserRefreshToken(user: IUser) {
        await this.RefreshTokenModel.delete({user_id: Types.ObjectId(user._id)}).exec();
    }
}
