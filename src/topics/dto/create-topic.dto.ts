import {ApiModelProperty} from '@nestjs/swagger';

export class CreateTopicDto {
    @ApiModelProperty()
    readonly title: string;

    @ApiModelProperty()
    readonly description: string;
}
