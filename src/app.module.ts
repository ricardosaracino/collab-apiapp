import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {DATABASE_CONNECTION} from '../constants';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {TopicsModule} from './topics/topics.module';
import {UsersModule} from './users/users.module';

@Module({
    imports: [MongooseModule.forRoot(DATABASE_CONNECTION, {useNewUrlParser: true}), TopicsModule, AuthModule, UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
