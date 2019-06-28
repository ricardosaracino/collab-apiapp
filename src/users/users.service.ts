import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {IUser} from './interfaces/user.interface';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly UserModel: Model<IUser>) {
    }

    async registerOAuthUser(user: IUser): Promise<IUser> {
        const createdUser = new this.UserModel(user);
        return await createdUser.save();
    }

    async findOneByThirdPartyId(thirdPartyId: string): Promise<IUser> {
        return await this.UserModel.findOne({thirdPartyId}).exec();
    }
}
