import {ApiModelProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

export class RefreshTokenDto {

    @Expose()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly refreshToken: string;
}
