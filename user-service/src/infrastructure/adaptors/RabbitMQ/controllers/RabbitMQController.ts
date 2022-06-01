import { Controller } from '@nestjs/common';
import { GetUserByIdQuery } from '../../../../application/queries/get-user.query';
import { QueryBus } from '@nestjs/cqrs';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class RabbitMQController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: 'get-user' })
  async getUserById(@Payload() id: string, @Ctx() context: RmqContext) {
    return await this.queryBus
      .execute(new GetUserByIdQuery(id))
      .then((user) => {
        context.getChannelRef().ack(context.getMessage());
        console.log(user);
        return user;
      });
  }
}
