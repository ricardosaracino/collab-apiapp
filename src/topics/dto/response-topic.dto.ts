import {ApiModelProperty} from '@nestjs/swagger';

export class ResponseTopicDto {

    @ApiModelProperty()
    readonly _id: string;

    @ApiModelProperty()
    readonly title: string;

    @ApiModelProperty()
    readonly description: string;

    @ApiModelProperty()
    readonly createdAt: string;
}
