import { ClientProviderOptions } from '@nestjs/microservices';

const { NODE_ENV } = process.env;

const url =
  NODE_ENV === 'prod'
    ? 'amqp://guest:guest@rabbitmq:5672/'
    : 'amqp://guest:guest@localhost:5672/';

export function RabbitConfig(): Array<ClientProviderOptions> {
  return [
    {
      name: `MEDIA_SERVICE`,
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

// Connection to microservices
export function MicroserviceConfig() {
  //empty
}
