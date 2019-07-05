import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {decode} from 'jsonwebtoken';
import {Strategy} from 'passport-azure-ad-oauth2';
import {IUser} from '../users/interfaces/user.interface';
import {AuthService} from './auth.service';

@Injectable()
export class AzureStrategy extends PassportStrategy(Strategy, 'azure') {

    /**
     * https://github.com/auth0/passport-azure-ad-oauth2#passport-azure-ad-oauth2
     * https://docs.microsoft.com/en-us/azure/active-directory/develop/access-tokens
     */
    constructor(private readonly authService: AuthService) {
        super({
            clientID: 'f87fb08c-86cc-4e93-80eb-ea7e48f4aa63', // Applicationid
            clientSecret: 'P/nBAn31nU0pnwE/Hdx6qn:@3wEqA9ed',
            callbackURL: 'http://localhost:3000/auth/callback',
            resource: '00000003-0000-0000-c000-000000000000', // resourceAppId
            tenant: '053gc.onmicrosoft.com',
            scope: ['profile', 'email'],
        });
    }

    async validate(profileJwt, refreshToken, params, done: Function) {

        try {

            const profile = decode(profileJwt) as any;

            const oauthUser: IUser = {
                thirdPartyId: profile.oid,
                name: profile.name,
                email: profile.upn,
                provider: params.provider,
            };

            done(null, await this.authService.validateOAuthLogin(oauthUser));

        } catch (err) {
            done(err, false);
        }
    }
}
