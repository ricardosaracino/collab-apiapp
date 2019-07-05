import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
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
        return await this.TopicModel.findById(Types.ObjectId(id)).exec();
    }

    async createComment(topicId: string, comment: IComment, user: IUser): Promise<IComment> {

        const createdComment = new this.CommentModel({
            ...{topic_id: Types.ObjectId(topicId)},
            ...comment,
            ...{createdBy: {id: Types.ObjectId(user._id), name: user.name}},

        });

        return await createdComment.save();
    }

    async createCommentReply(topicId: string, parentId: string, comment: IComment, user: IUser): Promise<IComment> {

        // todo exists
        const parentExists = await this.CommentModel.findById(Types.ObjectId(parentId)).select({_id: 1}).then(doc => !!doc);

        if (!parentExists) {
            throw new NotFoundException();
        }

        const createdComment = new this.CommentModel({
            ...{topic_id: Types.ObjectId(topicId)},
            ...{parent_id: Types.ObjectId(parentId)},
            ...comment,
            ...{createdBy: {id: Types.ObjectId(user._id), name: user.name}},
        });

        comment = await createdComment.save();

        // this will pass regardless of the update being "successful"
        const res = await this.CommentModel.updateOne({_id: Types.ObjectId(parentId)}, {
            $push: {
                comments: {$each: [comment._id], $position: 0},
            },
        }).exec();

        return comment;
    }


    async voteComment(commentId: string, vote: { vote: '+1' | '-1' }, user: IUser): Promise<IComment> {

        // todo exists
        const commentExists = await this.CommentModel.findById(Types.ObjectId(commentId)).select({_id: 1}).then(doc => !!doc);

        if (!commentExists) {
            throw new NotFoundException();
        }

        if (vote.vote === '+1') {
            await this.CommentModel.updateOne({_id: Types.ObjectId(commentId)}, {
                $addToSet: {
                    upVotes: {id: user._id, name: user.name},
                },
                $pull: {
                    downVotes: {id: {$eq: user._id}},
                },
            }).exec();
        }

        if (vote.vote === '-1') {
            await this.CommentModel.updateOne({_id: Types.ObjectId(commentId)}, {
                $addToSet: {
                    downVotes: {id: user._id, name: user.name},
                },
                $pull: {
                    upVotes: {id: {$eq: user._id}},
                },
            }).exec();
        }

        // todo probably a better way to do this
        // todo this has no children
        return await this.CommentModel.findById(Types.ObjectId(commentId)).exec();
    }

    async updateComment(commentId: string, comment: IComment, user: IUser): Promise<boolean> {

        const oldComment: IComment = await this.CommentModel.findById(Types.ObjectId(commentId)).exec();

        if (!oldComment) {
            throw new NotFoundException();
        }

        if (user._id !== oldComment.createdBy.id.toString()) {
            throw new ForbiddenException();
        }

        await this.CommentModel.updateOne({_id: Types.ObjectId(commentId)}, {

            text: comment.text,

            modifiedAt: new Date(),

            $push: {
                updateHistory: {$each: [{text: oldComment.text, updatedAt: oldComment.modifiedAt}], $position: 0},
            },

        }).exec();

        // todo probably a better way to do this
        // todo this has no children
        return await this.CommentModel.findById(Types.ObjectId(commentId)).exec();
    }

    async deleteComment(commentId: string, user: IUser): Promise<boolean> {

        return await this.CommentModel.updateOne({_id: Types.ObjectId(commentId)}, {}).exec();
    }

    async findAllComments(topicId): Promise<IComment[]> {

        return await this.CommentModel.find({topic_id: topicId, parent_id: null})
            .populate({
                path: 'comments',
                populate: {path: 'comments', populate: {path: 'comments', populate: {path: 'comments'}}},
            }).sort({createdAt: -1}).exec();
    }
}
