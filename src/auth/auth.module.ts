import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {UsersModule} from '../users/users.module';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {AzureStrategy} from './azure.strategy';
import {JwtStrategy} from './jwt.strategy';

@Module({
    imports: [UsersModule, PassportModule.register({defaultStrategy: 'jwt'})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, AzureStrategy],
})
export class AuthModule {
}
