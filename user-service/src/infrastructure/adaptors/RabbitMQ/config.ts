import { ClientProviderOptions } from "@nestjs/microservices/module/interfaces/clients-module.interface";
import { Transport } from "@Nestjs/microservices";

const { SERVICE, MESSAGEBUS_URL, MESSAGEBUS_QUEUE } = process.env;

export function RabbitConfig(): Array<ClientProviderOptions> {
  return [
  { 
    name: `USER_SERVICE`, 
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672/'],
      noAck: false,
      queue: `user_queue`,
      queueOptions: {
        durable: true,
        },
      },
    },
  ];
}