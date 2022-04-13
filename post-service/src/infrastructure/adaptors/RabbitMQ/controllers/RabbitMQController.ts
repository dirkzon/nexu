import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { QueryBus } from '@nestjs/cqrs';
import { GetPostByIdQuery } from '../../../../application/queries/get-post-by-id.query';

@Controller()
export class RabbitMQController {
    constructor(private readonly queryBus: QueryBus) {}

    @MessagePattern()
    async GetPostById(@Payload() data: {}, @Ctx() context: RmqContext) {
        console.log("id", data)
        const post = await this.queryBus.execute(new GetPostByIdQuery(data as string));
        console.log("post", post)
        const originalMsg = context.getMessage();
        context.getChannelRef().ack(originalMsg);
        return post;
    }
}
