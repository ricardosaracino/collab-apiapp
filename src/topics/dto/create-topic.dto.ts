import {ApiModelProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

export class CreateTopicDto {
    @IsNotEmpty()
    @Expose()
    @ApiModelProperty()
    readonly title: string;

    @IsNotEmpty()
    @Expose()
    @ApiModelProperty()
    readonly description: string;
}
