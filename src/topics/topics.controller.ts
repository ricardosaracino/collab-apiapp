import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {User} from '../auth/user.decorator';
import {IUser} from '../users/interfaces/user.interface';
import {CreateCommentDto, CreateTopicDto, ResponseCommentDto, ResponseTopicDto} from './dto';
import {IComment, ITopic} from './interfaces';
import {TopicsService} from './topics.service';

@UseGuards(JwtAuthGuard)
@Controller('topics')
@ApiUseTags('Collab')
export class TopicsController {

    constructor(private readonly topicsService: TopicsService) {
    }

    @Post()
    @ApiOperation({title: 'Create Topic'})
    @ApiResponse({status: 200, type: ResponseTopicDto})
    async create(@User() user: IUser, @Body() createTopicDto: CreateTopicDto): Promise<ITopic> {
        return await this.topicsService.create(createTopicDto, user);
    }

    @Post(':topicId')
    @ApiOperation({title: 'Update Topic'})
    @ApiResponse({status: 200, type: ResponseTopicDto})
    async update(@User() user: IUser, @Param('topicId') topicId: string, @Body() createTopicDto: CreateTopicDto): Promise<ITopic> {
        return await this.topicsService.update(topicId, createTopicDto);
    }

    @Delete(':topicId')
    @ApiOperation({title: 'Delete Topic'})
    async delete(@Param('topicId') topicId: string) {
        return await this.topicsService.delete(topicId);
    }

    @Get(':topicId')
    @ApiOperation({title: 'Find Topic by Id'})
    @ApiResponse({status: 200, type: ResponseTopicDto})
    async findById(@Param('topicId') topicId: string): Promise<ITopic> {
        return this.topicsService.findById(topicId);
    }

    @Get()
    @ApiOperation({title: 'Find All Topics'})
    @ApiResponse({status: 200, type: ResponseTopicDto, isArray: true})
    async findAll(): Promise<ITopic[]> {
        return this.topicsService.findAll();
    }

    // create gaurd
    @Post(':topicId/comments')
    @ApiOperation({title: 'Create a Comment on a Topic'})
    @ApiResponse({status: 200, type: ResponseCommentDto})
    async createComment(@User() user: IUser, @Param('topicId') topicId: string, @Body() createCommentDto: CreateCommentDto) {
        return await this.topicsService.createComment(topicId, createCommentDto, user);
    }

    @Post(':topicId/comments/:parentId')
    @ApiOperation({title: 'Create a Comment on a Comment'})
    @ApiResponse({status: 200, type: ResponseCommentDto})
    async createCommentReply(@User() user: IUser, @Param('topicId') topicId: string, @Param('parentId') parentId: string, @Body() createCommentDto: CreateCommentDto) {
        return await this.topicsService.createCommentReply(topicId, parentId, createCommentDto, user);
    }

    @Get(':topicId/comments')
    @ApiOperation({title: 'Find all Comments on a Topic'})
    @ApiResponse({status: 200, type: ResponseCommentDto, isArray: true})
    async findAllComments(@Param('topicId') topicId: string): Promise<IComment[]> {
        return await this.topicsService.findAllComments(topicId);
    }
}
