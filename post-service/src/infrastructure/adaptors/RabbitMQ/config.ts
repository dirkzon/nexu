import { ClientProviderOptions } from "@nestjs/microservices/module/interfaces/clients-module.interface";
import { Transport } from "@Nestjs/microservices";

const { SERVICE, RABBIT_TRANPORT, RABBIT_URL, RABBIT_QUEUE } = process.env;

export function RabbitConfig(): Array<ClientProviderOptions> {
  return [
  { 
    name: "POST_SERVICE", 
    transport: Transport.RMQ,
    options: {
      urls: ["amqp://guest:guest@localhost:5672/"],
      noAck: false,
      queue: "post_queue",
      queueOptions: {
        durable: true,
        },
      },
    },
  ];
}
