import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';


import * as passwordHash from 'password-hash';
import {IRefreshToken} from './interfaces/refresh-token.interface';
import {IUser} from './interfaces/user.interface';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly UserModel: Model<IUser>,
                @InjectModel('RefreshToken') private readonly RefreshTokenModel: Model<IRefreshToken>) {
    }

    async registerOAuthUser(user: IUser): Promise<IUser> {
        const createdUser = new this.UserModel(user);
        return await createdUser.save();
    }

    async findOneByThirdPartyId(thirdPartyId: string): Promise<IUser> {
        return await this.UserModel.findOne({thirdPartyId}).exec();
    }

    async setUserRefreshToken(user: IUser, refreshToken: string): Promise<void> {

        const refreshTokenHash = passwordHash.generate(refreshToken);

        await this.RefreshTokenModel.updateOne({user_id: Types.ObjectId(user._id)}, {refreshTokenHash}, {upsert: true}).exec();
    }

    async findUserRefreshToken(user: IUser, refreshToken: string): Promise<void> {

        const refreshTokenHash = passwordHash.generate(refreshToken);

        return await this.UserModel.findOne({user_id: Types.ObjectId(user._id), refreshTokenHash}).exec();
    }

    async deleteUserRefreshToken(user: IUser) {
        await this.RefreshTokenModel.delete({user_id: Types.ObjectId(user._id)}).exec();
    }
}
