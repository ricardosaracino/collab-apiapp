import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from './interfaces/user.interface';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly UserModel: Model<User>) {
    }

    async create(user: User): Promise<User> {
//        const createdTopic = new this.UserModel(user);
//        return await createdTopic.save();

        return user;
    }

    async findByUserName(username: string): Promise<User> {
//        return await this.UserModel.findOne({username}).exec();

        return {} as any as User;
    }
}
