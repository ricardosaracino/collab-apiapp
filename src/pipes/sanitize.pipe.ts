import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';
import {plainToClass} from 'class-transformer';

import {CreateTopicDto} from '../topics/dto/create-topic.dto';

@Injectable()
export class SanitizePipe implements PipeTransform {

     t : CreateTopicDto;

    /** https://docs.nestjs.com/pipes#object-schema-validation */

    constructor(private readonly dto: Object) {
    }

    transform(value: any, metadata: ArgumentMetadata) {



       const real = plainToClass(CreateTopicDto, value);

        console.log(real); // ['id', 'name', 'age']


        console.log(Reflect.ownKeys(CreateTopicDto));
        console.log(Reflect.ownKeys(new CreateTopicDto()));

        return null;//getOwnPropertyNames.reduce((s, key) => {s[key] = value[key]; return s}, {});
    }
}
