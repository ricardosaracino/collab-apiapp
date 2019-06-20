import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateTopicDto} from './dto/create-topic.dto';
import {Topic} from './interfaces/topic.interface';

@Injectable()
export class TopicsService {

    constructor(@InjectModel('Topic') private readonly TopicModel: Model<Topic>) {
    }

    async create(createTopicDto: CreateTopicDto): Promise<Topic> {
        const createdTopic = new this.TopicModel(createTopicDto);
        return await createdTopic.save();
    }

    async findAll(): Promise<Topic[]> {
        return await this.TopicModel.find().exec();
    }
}
