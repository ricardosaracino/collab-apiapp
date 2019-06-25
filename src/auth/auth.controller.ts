import {Body, Controller, Post} from '@nestjs/common';
import {ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {LoginAuthDto} from './dto/login-auth.dto';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post()
    @ApiOperation({title: 'Create Topic'})
    async login(@Body() loginAuthDto: LoginAuthDto): Promise<boolean> {
        return await this.authService.login(loginAuthDto);
    }
}
