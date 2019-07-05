import {Controller, Delete, Get, Req, Res, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth, ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {IUser} from '../users/interfaces/user.interface';
import {AuthService} from './auth.service';
import {JwtAuthGuard} from './jwt-auth.guard';
import {User} from './user.decorator';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {

    /**
     * https://medium.com/@nielsmeima/auth-in-nest-js-and-angular-463525b6e071
     */
    constructor(private readonly authService: AuthService) {
    }

    @Get('login')
    @UseGuards(AuthGuard('azure'))
    @ApiOperation({title: 'Initiates the OAuth2 login flow'})
    public login() {
    }

    @Get('callback')
    @UseGuards(AuthGuard('azure'))
    @ApiOperation({title: 'Handles the OAuth2 callback', description: 'Redirects with id token to be used as Bearer'})
    public loginCallback(@Req() req, @Res() res) {

        const accessToken: string = req.user.accessToken;

        const refreshToken: string = req.user.refreshToken;

        // can use for SWAGGER
        console.log(accessToken);

        console.log(refreshToken);

        // todo get the refresh token out of the url
        if (accessToken) {
            res.redirect(`http://localhost:4200/login/success/${accessToken}/${refreshToken}?redirect=/topic/5d1c9b8e7badd01120b997f9/comments`);
        } else {
            res.redirect('http://localhost:4200/login/failure');
        }
    }

    @Get('token/:refreshToken')
    public token(@User() user: IUser) {

    }

    @Delete('token/:refreshToken')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({title: 'Revokes Refresh Token'})
    public async revokeRefreshToken(@User() user: IUser): Promise<void> {
        await this.authService.revokeRefreshToken(user);
    }
}
