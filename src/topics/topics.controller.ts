import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {CreateCommentDto} from './dto/create-comment.dto';
import {CreateTopicDto} from './dto/create-topic.dto';
import {Topic} from './interfaces';
import {TopicsService} from './topics.service';

@ApiUseTags('Collab')
@Controller('topics')
export class TopicsController {

    constructor(private readonly TopicsService: TopicsService) {
    }

    @Post()
    @ApiOperation({title: 'Create Topic'})
    async create(@Body() createTopicDto: CreateTopicDto) {
        return await this.TopicsService.create(createTopicDto);
    }

    @Post(':topicId')
    @ApiOperation({title: 'Update Topic'})
    async update(@Param('topicId') topicId: string, @Body() createTopicDto: CreateTopicDto) {
        return await this.TopicsService.update(topicId, createTopicDto);
    }

    @Get(':topicId')
    @ApiOperation({title: 'Find Topic by Id'})
    async findById(@Param('topicId') topicId: string): Promise<Topic> {
        return this.TopicsService.findById(topicId);
    }

    @Get()
    @ApiOperation({title: 'Find All Topics'})
    async findAll(): Promise<Topic[]> {
        return this.TopicsService.findAll();
    }

    @Post(':topicId/comments')
    @ApiOperation({title: 'Create a Comment on a Topic'})
    async createComment(@Param('topicId') topicId: string, @Body() createCommentDto: CreateCommentDto) {
        return await this.TopicsService.createComment(topicId, createCommentDto);
    }

    @Get(':topicId/comments')
    @ApiOperation({title: 'Find all Comments on a Topic'})
    async findAllComments(@Param('topicId') topicId: string) {
        return await this.TopicsService.findAllComments(topicId);
    }
}
