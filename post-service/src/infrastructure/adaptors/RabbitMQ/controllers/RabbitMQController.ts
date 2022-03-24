import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';

// {"data": "hello"}

@Controller()
export class RabbitMQController {
    @MessagePattern()
    getGreetingMessage(@Payload() data: {}, @Ctx() context: RmqContext) {
        console.log("message recieved")
        console.log(data);
        console.log(context)
    }
}
