import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import {CreateCommentDto} from './dto/create-comment.dto';
import {CreateTopicDto} from './dto/create-topic.dto';
import {Topic} from './interfaces';
import {TopicsService} from './topics.service';

@ApiUseTags('topics')
@Controller('topics')
export class TopicsController {

    constructor(private readonly TopicsService: TopicsService) {
    }

    @Post()
    async create(@Body() createTopicDto: CreateTopicDto) {
        return await this.TopicsService.create(createTopicDto);
    }

    @Get()
    async findAll(): Promise<Topic[]> {
        return this.TopicsService.findAll();
    }


    @Post(':topicId/comments')
    async createComment(@Param('topicId') topicId: string, @Body() createCommentDto: CreateCommentDto) {
        return await this.TopicsService.createComment(topicId, createCommentDto);
    }

    @Get(':topicId/comments')
    async findAllComments(@Param('topicId') topicId: string) {
        return await this.TopicsService.findAllComments(topicId);
    }

}

