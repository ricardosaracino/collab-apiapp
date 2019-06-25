import {ApiModelProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class LoginAuthDto {
    @Expose()
    @ApiModelProperty()
    readonly username: string;
}
