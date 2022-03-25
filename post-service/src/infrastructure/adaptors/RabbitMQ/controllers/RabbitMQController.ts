import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { QueryBus } from '@nestjs/cqrs';
import { GetPostByIdQuery } from 'src/application/queries/get-post-by-id.query';


@Controller()
export class RabbitMQController {

    constructor(private readonly queryBus: QueryBus) {}

    @MessagePattern()
    GetPostById(@Payload() data: {}, @Ctx() context: RmqContext) {
        this.queryBus.execute(new GetPostByIdQuery(data as string));
    }
}
