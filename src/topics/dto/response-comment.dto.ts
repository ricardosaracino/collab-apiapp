import {ApiModelProperty} from '@nestjs/swagger';
import {IUser} from '../../users/interfaces/user.interface';
import {IComment} from '../interfaces';

export class ResponseCommentDto {

    @ApiModelProperty()
    readonly _id: string;

    @ApiModelProperty()
    readonly topic_id: string;

    @ApiModelProperty()
    readonly parent_id: string;

    @ApiModelProperty()
    readonly comments: IComment[];

    @ApiModelProperty()
    readonly text: string;

    @ApiModelProperty()
    readonly createdBy: IUser;

    @ApiModelProperty()
    readonly createdAt: string;

    @ApiModelProperty()
    readonly modifiedAt: string;
}
