import {ApiModelProperty} from '@nestjs/swagger';

export class CreateCommentDto {
    @ApiModelProperty()
    readonly text: string;
}
