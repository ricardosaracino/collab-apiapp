import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {uid} from 'rand-token';
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
    public async validateOAuthLogin(oauthUser: IUser): Promise<{ accessToken: string, refreshToken: string }> {
        try {

            let user: IUser = await this.usersService.findOneByThirdPartyId(oauthUser.thirdPartyId);

            if (!user) {
                user = await this.usersService.registerOAuthUser(oauthUser);
            }

            const accessToken = await this.jwtService.signAsync((user as any).toObject());

            const refreshToken = await this.issueRefreshToken(user);

            return {accessToken, refreshToken};

        } catch (err) {
            throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }


    public async validatePayload(payload: IUser): Promise<IUser> {
        console.log(payload);

        return payload;
    }


    /**
     * https://stackoverflow.com/questions/26739167/jwt-json-web-token-automatic-prolongation-of-expiration
     * https://solidgeargroup.com/refresh-token-with-jwt-authentication-node-js
     */
    public async issueRefreshToken(user: IUser) {

        const token = uid(16);

        await this.usersService.setUserRefreshToken(user, token);

        return token;
    }

    public async validateRefreshToken(user: IUser, token) {
        await this.usersService.findUserRefreshToken(user, token);
    }

    public async revokeRefreshToken(user: IUser) {

        await this.usersService.deleteUserRefreshToken(user);
    }
}
