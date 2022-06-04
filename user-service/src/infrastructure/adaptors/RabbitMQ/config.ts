import { ClientsModuleOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';

const { NODE_ENV } = process.env;

const url =
  NODE_ENV === 'prod'
    ? 'amqp://guest:guest@rabbitmq:5672/'
    : 'amqp://guest:guest@localhost:5672/';

export function RabbitConfig(): ClientsModuleOptions {
  return [
    {
      name: `USER_SERVICE`,
      transport: 5, //Transport.RMQ
      options: {
        urls: [url],
        queue: `user_queue`,
        queueOptions: {
          durable: true,
        },
      },
    },
  ];
}

// Connection to microservices
export function MicroserviceConfig() {
  return [
    {
      name: 'POST_SERVICE',
      logger: console,
      transport: 5, //Transport.RMQ
      options: {
        urls: [url],
        noAck: false,
        queue: `post_queue`,
        queueOptions: {
          durable: true,
        },
      },
    },
    {
      name: 'COMMENT_SERVICE',
      logger: console,
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
    {
      name: 'MEDIA_SERVICE',
      logger: console,
      transport: 5, //Transport.RMQ
      options: {
        urls: [url],
        noAck: false,
        queue: `media_queue`,
        queueOptions: {
          durable: true,
        },
      },
    },
  ];
}
