import {Controller, Get, Req, Res, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {

    /**
     * https://medium.com/@nielsmeima/auth-in-nest-js-and-angular-463525b6e071
     */
    constructor() {
    }

    @Get('login')
    @UseGuards(AuthGuard('azure_ad_oauth2'))
    login() {
        // initiates the OAuth2 login flow
    }

    @Get('callback')
    @UseGuards(AuthGuard('azure_ad_oauth2'))
    loginCallback(@Req() req, @Res() res) {
        // handles the OAuth2 callback
        const jwt: string = req.user.jwt;
        if (jwt)
            res.redirect('http://localhost:4200/login/succes/' + jwt);
        else
            res.redirect('http://localhost:4200/login/failure');
    }

    @Get('protected')
    @UseGuards(AuthGuard('jwt'))
    protectedResource() {
        return 'JWT is working!';
    }
}
