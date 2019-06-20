import {Body, Controller, Get, Post} from '@nestjs/common';
import {CreateTopicDto} from './dto/create-topic.dto';
import {Topic} from './interfaces/topic.interface';
import {TopicsService} from './topics.service';

@Controller('topics')
export class TopicsController {

    constructor(private readonly TopicsService: TopicsService) {
    }

    @Post()
    async create(@Body() createTopicDto: CreateTopicDto) {
        this.TopicsService.create(createTopicDto);
    }

    @Get()
    async findAll(): Promise<Topic[]> {
        return this.TopicsService.findAll();
    }
}

