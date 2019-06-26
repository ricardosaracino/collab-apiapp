import {ApiModelProperty} from '@nestjs/swagger';

export class ResponseCommentDto {

    @ApiModelProperty()
    readonly _id: string;

    @ApiModelProperty()
    readonly topic_id: string;

    @ApiModelProperty()
    readonly parent_id: string;

    @ApiModelProperty()
    readonly comments: Comment[];

    @ApiModelProperty()
    readonly text: string;

    @ApiModelProperty()
    readonly createdAt: string;
}
