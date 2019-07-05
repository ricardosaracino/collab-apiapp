import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {RefreshTokenSchema} from './schemas/refreshTokens.schema';
import {UserSchema} from './schemas/user.schema';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';

@Module({
    imports: [MongooseModule.forFeature([
        {name: 'User', schema: UserSchema},
        {name: 'RefreshToken', schema: RefreshTokenSchema},
    ])],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {
}
