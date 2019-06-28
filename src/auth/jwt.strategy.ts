import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {JWT_SECRET_KEY} from '../../constants';
import {AuthService} from './auth.service';
import {JwtPayload} from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    /**
     * https://github.com/nielsmeima/nestjs-angular-auth/blob/master/back-end/src/auth/jwt.strategy.ts
     */
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET_KEY,
        });
    }

    /**
     * @param payload
     * @param done
     */
    async validate(payload: JwtPayload, done: Function) {
        const user = await this.authService.validatePayload(payload); // Payload is a user
        if (!user) {
            return done(new UnauthorizedException(), false);
        }
        done(null, user);
    }
}
