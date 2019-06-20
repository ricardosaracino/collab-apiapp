import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {DATABASE_CONNECTION} from '../constants';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CommentsController} from './comments/comments.controller';
import {TopicsModule} from './topics/topics.module';

@Module({
    imports: [MongooseModule.forRoot(DATABASE_CONNECTION, {useNewUrlParser: true}), TopicsModule],
    controllers: [AppController, CommentsController],
    providers: [AppService],
})
export class AppModule {
}
