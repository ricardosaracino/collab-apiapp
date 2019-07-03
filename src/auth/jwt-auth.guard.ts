import {ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {JsonWebTokenError} from 'jsonwebtoken';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        return super.canActivate(context);
    }

    /**
     * todo info in exception?
     */
    handleRequest(err, user, info) {
        if (err || !user) {

            if (info instanceof JsonWebTokenError) {
                throw new UnauthorizedException(info.message);
            }

            if (info instanceof Error) { // "No auth token"
                throw new UnauthorizedException(info.message);
            }

            if (err instanceof Error) {
                throw new UnauthorizedException(err.message);
            }

            throw new UnauthorizedException();
        }

        return user;
    }
}
