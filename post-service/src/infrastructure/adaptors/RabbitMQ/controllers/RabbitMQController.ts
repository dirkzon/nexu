import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { QueryBus } from '@nestjs/cqrs';
import { GetPostByIdQuery } from 'src/application/queries/get-post-by-id.query';


@Controller()
export class RabbitMQController {

    constructor(private readonly queryBus: QueryBus) {}

    @MessagePattern()
    async GetPostById(@Payload() data: {}, @Ctx() context: RmqContext) {
        const post = await this.queryBus.execute(new GetPostByIdQuery(data as string));
        console.log(post)
        const originalMsg = context.getMessage();
        context.getChannelRef().ack(originalMsg);
        return post;
    }
}
