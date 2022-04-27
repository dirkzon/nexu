import { Controller } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";
import { UpdateUserCommand } from "../../../../application/commands/update-user.command";
import { UserCreatedCommand } from "../../../../application/commands/user-created.command";
import { UserCreatedInput } from "../models/user-created.input";

//{"pattern": "user-created", "data": {"name": "me", "id":"123", "password":"pass", "email":"email"}}

@Controller()
export class RabbitMQController {
    constructor(private readonly commandBus: CommandBus) {}

    @EventPattern('user_created')
    async UserCreated(@Payload() data: UserCreatedInput, @Ctx() context: RmqContext) {
        console.log('Recieved user-created event');
        await this.commandBus.execute(new UserCreatedCommand(
            data.id, 
            data.name, 
            data.email, 
            data.password,
        )).catch((e) => {
            context.getChannelRef().reject(e, false);
        });
        context.getChannelRef().ack(context.getMessage());
    }

    @EventPattern('user-updated')
    async UserUpdated(@Payload() data: UserCreatedInput, @Ctx() context: RmqContext) {
        console.log('Recieved user-updated event');
        await this.commandBus.execute(new UpdateUserCommand(
            data.id,
            data.name,
        )).catch((e) => {
            context.getChannelRef().reject(e, false);
        });
        context.getChannelRef().ack(context.getMessage());
    }
}