import {Module} from '@nestjs/common';
import {TopicsModule} from '../topics/topics.module';
import {UsersModule} from '../users/users.module';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';

@Module({
    imports: [UsersModule, TopicsModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {
}
