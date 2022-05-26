import { ClientProviderOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';

const { NODE_ENV } = process.env;

const url =
  NODE_ENV === 'prod'
    ? 'amqp://guest:guest@rabbitmq:5672/'
    : 'amqp://guest:guest@localhost:5672/';

export function RabbitConfig(): Array<ClientProviderOptions> {
  return [
    {
      name: `COMMENT_SERVICE`,
      transport: 5, //Transport.RMQ
      options: {
        urls: [url],
        noAck: false,
        queue: `comment_queue`,
        queueOptions: {
          durable: true,
        },
      },
    },
  ];
}

// Connection to microservices
export function MicroserviceConfig() {
  //EMPTY
}
