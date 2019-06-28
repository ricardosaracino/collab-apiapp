import {Injectable, UseGuards} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {AuthGuard} from '@nestjs/passport';
import {Model, Types} from 'mongoose';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {IUser} from '../users/interfaces/user.interface';
import {IComment, ITopic} from './interfaces';

@Injectable()
export class TopicsService {

    constructor(@InjectModel('Topic') private readonly TopicModel: Model<ITopic>,
                @InjectModel('Comment') private readonly CommentModel: Model<IComment>) {
    }

    async create(topic: ITopic, user: IUser): Promise<ITopic> {

        const createdTopic = new this.TopicModel({
            ...topic,
            ...{createdBy: {id: Types.ObjectId(user._id), name: user.name}},
        });

        return await createdTopic.save();
    }

    /**
     * todo (node:11000) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the
     * todo `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#-findandmodify-
     */
    async update(id: string, topic: ITopic): Promise<ITopic> {
        return await this.TopicModel.findOneAndUpdate({_id: Types.ObjectId(id)}, topic).exec();
    }

    async delete(id: string): Promise<ITopic> {
        return await this.TopicModel.findOneAndRemove({_id: Types.ObjectId(id)}).exec();
    }

    async findAll(): Promise<ITopic[]> {
        return await this.TopicModel.find().exec();
    }

    async findById(id: string): Promise<ITopic> {
        const topic = await this.TopicModel.findById(Types.ObjectId(id)).exec();

        return topic;
    }

    @UseGuards(JwtAuthGuard)
    async createComment(topicId: string, comment: IComment, user: IUser): Promise<IComment> {

        const createdComment = new this.CommentModel({
            ...{topic_id: Types.ObjectId(topicId)},
            ...comment,
            ...{createdBy: {id: Types.ObjectId(user._id), name: user.name}},

        });

        return await createdComment.save();
    }

    @UseGuards(AuthGuard('jwt'))
    async createCommentReply(topicId: string, parentId: string, comment: IComment, user: IUser): Promise<IComment> {

        const createdComment = new this.CommentModel({
            ...{topic_id: Types.ObjectId(topicId)},
            ...{parent_id: Types.ObjectId(parentId)},
            ...comment,
            ...{createdBy: {id: Types.ObjectId(user._id), name: user.name}},
        });

        comment = await createdComment.save();

        await this.CommentModel.updateOne({_id: Types.ObjectId(parentId)}, {
            $push: {
                comments: {$each: [comment._id], $position: 0},
            },
        }).exec();

        return comment;
    }

    async findAllComments(topicId): Promise<IComment[]> {

        return await this.CommentModel.find({topic_id: topicId, parent_id: null})
            .populate({
                path: 'comments',
                populate: {path: 'comments', populate: {path: 'comments', populate: {path: 'comments'}}},
            }).sort({createdAt: -1}).exec();
    }
}
