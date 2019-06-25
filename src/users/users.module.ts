import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from './schemas/user.schema';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';

@Module({
    imports: [MongooseModule.forFeature([
        {name: 'User', schema: UserSchema},
    ])],
    exports: [UsersService],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {
}
