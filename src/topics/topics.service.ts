import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Comment, Topic} from './interfaces';

@Injectable()
export class TopicsService {

    constructor(@InjectModel('Topic') private readonly TopicModel: Model<Topic>,
                @InjectModel('Comment') private readonly CommentModel: Model<Comment>) {
    }

    async create(topic: Topic): Promise<Topic> {
        const createdTopic = new this.TopicModel(topic);
        return await createdTopic.save();
    }

    /**
     * todo (node:11000) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the
     * todo `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#-findandmodify-
     */
    async update(id: string, topic: Topic): Promise<Topic> {
        return await this.TopicModel.findOneAndUpdate({_id: Types.ObjectId(id)}, topic).exec();
    }

    async delete(id: string): Promise<Topic> {
        return await this.TopicModel.findOneAndRemove({_id: Types.ObjectId(id)}).exec();
    }

    async findAll(): Promise<Topic[]> {
        return await this.TopicModel.find().exec();
    }

    async findById(id: string): Promise<Topic> {
        return await this.TopicModel.findById(Types.ObjectId(id)).exec();
    }

    async createComment(topicId: string, comment: Comment): Promise<Comment> {

        const createdComment = new this.CommentModel({
            ...{topic_id: Types.ObjectId(topicId)},
            ...comment,
        });

        return await createdComment.save();
    }

    async createCommentReply(topicId: string, parentId: string, comment: Comment): Promise<Comment> {

        const createdComment = new this.CommentModel({
            ...{topic_id: Types.ObjectId(topicId)},
            ...{parent_id: Types.ObjectId(parentId)},
            ...comment,
        });

        comment = await createdComment.save();

        await this.CommentModel.updateOne({_id: Types.ObjectId(parentId)}, {
            $push: {
                comments: {$each: [comment._id], $position: 0},
            },
        }).exec();

        return comment;
    }

    async findAllComments(topicId): Promise<Comment[]> {

        return await this.CommentModel.find({topic_id: topicId, parent_id: null})
            .populate({
                path: 'comments',
                populate: {path: 'comments', populate: {path: 'comments', populate: {path: 'comments'}}},
            }).sort({createdAt: -1}).exec();
    }
}
