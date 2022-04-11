import { ClientProviderOptions } from "@nestjs/microservices/module/interfaces/clients-module.interface";

const { SERVICE, MESSAGEBUS_URL, MESSAGEBUS_QUEUE } = process.env;

export function RabbitConfig(): Array<ClientProviderOptions> {
  return [
  { 
    name: `${SERVICE}`, 
    transport: 5, //Transport.RMQ
    options: {
      urls: ['amqp://guest:guest@rabbitmq:5672/'],
      noAck: false,
      queue: `post_queue`,
      queueOptions: {
        durable: true,
        },
      },
    },
  ];
}
