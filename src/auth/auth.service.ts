import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {IUser} from '../users/interfaces/user.interface';
import {UsersService} from '../users/users.service';


@Injectable()
export class AuthService {

    /**
     * https://github.com/nielsmeima/nestjs-angular-auth/blob/master/back-end/src/auth/auth.service.ts
     */
    constructor(private readonly usersService: UsersService,
                private readonly jwtService: JwtService) {
    }

    /**
     * returns JWT IUser object
     */
    public async validateOAuthLogin(oauthUser: IUser): Promise<string> {
        try {
            let user: IUser = await this.usersService.findOneByThirdPartyId(oauthUser.thirdPartyId);

            if (!user) {
                user = await this.usersService.registerOAuthUser(oauthUser);
            }

            return this.jwtService.signAsync((user as any).toObject()); // await if not returning

        } catch (err) {
            throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }


    public async validatePayload(payload: IUser): Promise<IUser> {
        console.log(payload);

        return payload;
    }
}
