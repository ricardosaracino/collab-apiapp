import {ApiModelProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

export class VoteCommentDto {

    @Expose()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly vote: '+1' | '-1';
}
