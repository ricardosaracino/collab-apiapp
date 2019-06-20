import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {CreateCommentDto} from './dto/create-comment.dto';
import {CreateTopicDto} from './dto/create-topic.dto';
import {Comment, Topic} from './interfaces';

@Injectable()
export class TopicsService {

    constructor(@InjectModel('Topic') private readonly TopicModel: Model<Topic>,
                @InjectModel('Comment') private readonly CommentModel: Model<Comment>) {
    }

    async create(createTopicDto: CreateTopicDto): Promise<Topic> {
        const createdTopic = new this.TopicModel(createTopicDto);
        return await createdTopic.save();
    }

    async findAll(): Promise<Topic[]> {
        return await this.TopicModel.find().exec();
    }

    async findById(id: string): Promise<Topic> {
        return await this.TopicModel.findById(Types.ObjectId(id)).exec();
    }

    async createComment(topicId: string, createCommentDto: CreateCommentDto): Promise<Comment> {

        const createdComment = new this.CommentModel({
            ...{topic_id: Types.ObjectId(topicId)},
            ...createCommentDto,
        });

        return await createdComment.save();
    }

    async findAllComments(topicId): Promise<Comment[]> {
        return await this.CommentModel.find({topic_id: topicId}).exec();
    }
}
