import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {JWT_SECRET_KEY} from '../../constants';
import {UsersModule} from '../users/users.module';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {AzureStrategy} from './azure.strategy';
import {JwtStrategy} from './jwt.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: JWT_SECRET_KEY,
            signOptions: {
                expiresIn: 3600,
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, AzureStrategy],
    exports: [PassportModule, AuthService],
})
export class AuthModule {
}
