import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {CreateCommentDto, CreateTopicDto, ResponseCommentDto, ResponseTopicDto} from './dto';
import {Comment, Topic} from './interfaces';
import {TopicsService} from './topics.service';

@ApiUseTags('Collab')
@Controller('topics')
export class TopicsController {

    constructor(private readonly topicsService: TopicsService) {
    }

    @Post()
    @ApiOperation({title: 'Create Topic'})
    @ApiResponse({status: 200, type: ResponseTopicDto})
    async create(@Body() createTopicDto: CreateTopicDto): Promise<Topic> {
        return await this.topicsService.create(createTopicDto);
    }

    @Post(':topicId')
    @ApiOperation({title: 'Update Topic'})
    @ApiResponse({status: 200, type: ResponseTopicDto})
    async update(@Param('topicId') topicId: string, @Body() createTopicDto: CreateTopicDto): Promise<Topic> {
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
    async findById(@Param('topicId') topicId: string): Promise<Topic> {
        return this.topicsService.findById(topicId);
    }

    @Get()
    @ApiOperation({title: 'Find All Topics'})
    @ApiResponse({status: 200, type: ResponseTopicDto, isArray: true})
    async findAll(): Promise<Topic[]> {
        return this.topicsService.findAll();
    }

    @Post(':topicId/comments')
    @ApiOperation({title: 'Create a Comment on a Topic'})
    @ApiResponse({status: 200, type: ResponseCommentDto})
    async createComment(@Param('topicId') topicId: string, @Body() createCommentDto: CreateCommentDto) {
        return await this.topicsService.createComment(topicId, createCommentDto);
    }

    @Post(':topicId/comments/:parentId')
    @ApiOperation({title: 'Create a Comment on a Comment'})
    @ApiResponse({status: 200, type: ResponseCommentDto})
    async createCommentReply(@Param('topicId') topicId: string, @Param('parentId') parentId: string, @Body() createCommentDto: CreateCommentDto) {
        return await this.topicsService.createCommentReply(topicId, parentId, createCommentDto);
    }

    @Get(':topicId/comments')
    @ApiOperation({title: 'Find all Comments on a Topic'})
    @ApiResponse({status: 200, type: ResponseCommentDto, isArray: true})
    async findAllComments(@Param('topicId') topicId: string): Promise<Comment[]> {
        return await this.topicsService.findAllComments(topicId);
    }
}
