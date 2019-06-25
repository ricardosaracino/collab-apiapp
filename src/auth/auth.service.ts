import {Injectable} from '@nestjs/common';
import {TopicsService} from '../topics/topics.service';
import {LoginAuthDto} from './dto/login-auth.dto';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: TopicsService) {
    }

    public login(loginAuthDto: LoginAuthDto): boolean {

        //  const user = this.usersService.findByUserName(loginAuthDto.username);


        return true;
    }
}
