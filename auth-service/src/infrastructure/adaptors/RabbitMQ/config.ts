import { ClientProviderOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';

const { NODE_ENV } = process.env;

const url =
  NODE_ENV === 'prod'
    ? 'amqp://guest:guest@rabbitmq:5672/'
    : 'amqp://guest:guest@localhost:5672/';

// Sending messages to microservices
export function RabbitConfig(): Array<ClientProviderOptions> {
  return [
    {
      name: `AUTH_SERVICE`,
      transport: 5, //Transport.RMQ
      options: {
        urls: [url],
        noAck: false,
        queue: `auth_queue`,
        queueOptions: {
          durable: true,
        },
      },
    },
  ];
}

// Connection to microservices
export function MicroserviceConfig() {
  return {
    name: 'USER_SERVICE',
    logger: console,
    transport: 5, //Transport.RMQ
    options: {
      urls: [url],
      noAck: false,
      queue: `user_queue`,
      queueOptions: {
        durable: true,
      },
    },
  };
}
