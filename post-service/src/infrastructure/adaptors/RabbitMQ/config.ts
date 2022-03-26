import { Transport } from "@nestjs/microservices";
import { ClientProviderOptions } from "@nestjs/microservices/module/interfaces/clients-module.interface";

export function RabbitConfig(): Array<ClientProviderOptions> {
  return [
  { 
    name: 'POST_SERVICE', 
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672/'],
      noAck: false,
      queue: 'post_queue',
      queueOptions: {
        durable: true,
        },
      },
    },
  ];
}
