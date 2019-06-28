import {Controller, Get, Req, Res, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth, ApiUseTags} from '@nestjs/swagger';
import {JwtAuthGuard} from './jwt-auth.guard';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {

    /**
     * https://medium.com/@nielsmeima/auth-in-nest-js-and-angular-463525b6e071
     */
    constructor() {
    }

    @Get('login')
    @UseGuards(AuthGuard('azure'))
    login() {
        // initiates the OAuth2 login flow
    }

    @Get('callback')
    @UseGuards(AuthGuard('azure'))
    loginCallback(@Req() req, @Res() res) {
        // handles the OAuth2 callback
        const jwt: string = req.user.jwt;

        // can use for SWAGGER
        console.log(jwt);

        if (jwt) {
            res.redirect(`http://localhost:4200/login/success/${jwt}?redirect=/topic/5d0cdb2469c2b91b20d5b024/comments`);
        } else {
            res.redirect('http://localhost:4200/login/failure');
        }
    }

    @Get('protected')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    protectedResource() {
        return 'JWT is working!';
    }
}
