import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {sign} from 'jsonwebtoken';
import {JWT_SECRET_KEY} from '../../constants';
import {User} from '../users/interfaces/user.interface';
import {UsersService} from '../users/users.service';


@Injectable()
export class AuthService {

    /**
     * https://github.com/nielsmeima/nestjs-angular-auth/blob/master/back-end/src/auth/auth.service.ts
     */
    constructor(private readonly usersService: UsersService) {
    }

    /**
     * returns JWT User object
     */
    public async validateOAuthLogin(oauthUser: User): Promise<string> {
        try {
            let user: User = await this.usersService.findOneByThirdPartyId(oauthUser.thirdPartyId);

            if (!user) {
                user = await this.usersService.registerOAuthUser(oauthUser);
            }

            // jwt
            return sign((user as any).toObject(), JWT_SECRET_KEY, {expiresIn: 3600});

        } catch (err) {
            throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }
}
