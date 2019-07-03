import {ApiModelProperty} from '@nestjs/swagger';
import {Expose, Transform} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

export class CreateCommentDto {

    @Expose()
    @IsNotEmpty()
    @ApiModelProperty()
    @Transform((value: string) => value.trim())
    readonly text: string;
}
