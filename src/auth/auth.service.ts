import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {uid} from 'rand-token';
import {IRefreshToken} from '../users/interfaces/refresh-token.interface';
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
    public async validateOAuthLogin(oauthUser: IUser): Promise<{ authToken: string, refreshToken: string }> {
        try {

            let user: IUser = await this.usersService.findOneByThirdPartyId(oauthUser.thirdPartyId);

            if (!user) {
                user = await this.usersService.createUser(oauthUser);
            }

            const authToken = await this.jwtService.signAsync((user as any).toObject());

            const refreshToken = await this.issueRefreshToken(user);

            return {authToken, refreshToken};

        } catch (err) {
            throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }


    public async validatePayload(payload: IUser): Promise<IUser> {
        console.log(payload);

        return payload;
    }


    public async issueAuthToken(refreshToken: string): Promise<{ authToken: string, refreshToken: string }> {
        try {

            const refreshTokenUser: IRefreshToken = await this.usersService.findUserRefreshToken(refreshToken);

            if (!refreshTokenUser) {
                return null; //todo
            }

            const user = await this.usersService.findUserById(refreshTokenUser.user_id);

            const authToken = await this.jwtService.signAsync((user as any).toObject());

            return {authToken, refreshToken};

        } catch (err) {
            throw new InternalServerErrorException('issueAuthToken', err.message);
        }
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

    public async validateRefreshToken(token) {
        await this.usersService.findUserRefreshToken(token);
    }

    public async revokeRefreshToken(user: IUser) {

        await this.usersService.deleteUserRefreshToken(user);
    }
}
