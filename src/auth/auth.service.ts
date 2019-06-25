import {Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {LoginAuthDto} from './dto/login-auth.dto';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService) {
    }

    public login(loginAuthDto: LoginAuthDto): boolean {

        const user = this.usersService.findByUserName(loginAuthDto.username);

        if (!user) {


        }

        return true;
    }
}
