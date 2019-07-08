import {ApiModelProperty} from '@nestjs/swagger';
import {Expose, Transform} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

export class CreateTopicDto {

    @Expose()
    @IsNotEmpty()
    @ApiModelProperty()
    @Transform((value: string) => value.trim()) // todo  Cannot read property 'trim' of null
    readonly title: string;

    @Expose()
    @IsNotEmpty()
    @ApiModelProperty()
    @Transform((value: string) => value.trim()) // todo  Cannot read property 'trim' of null
    readonly description: string;
}
