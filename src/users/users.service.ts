import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from './interfaces/user.interface';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly UserModel: Model<User>) {
    }

    async registerOAuthUser(user: User): Promise<User> {
        const createdUser = new this.UserModel(user);
        return await createdUser.save();
    }

    async findOneByThirdPartyId(thirdPartyId: string): Promise<User> {
        return await this.UserModel.findOne({thirdPartyId}).exec();
    }
}
