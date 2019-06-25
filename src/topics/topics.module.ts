import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {CommentSchema} from './schemas/comment.schema';
import {TopicSchema} from './schemas/topic.schema';
import {TopicsController} from './topics.controller';
import {TopicsService} from './topics.service';

@Module({
    imports: [MongooseModule.forFeature([
        {name: 'Topic', schema: TopicSchema},
        {name: 'Comment', schema: CommentSchema},
    ])],
    exports: [TopicsService],
    providers: [TopicsService],
    controllers: [TopicsController],
})
export class TopicsModule {
}
