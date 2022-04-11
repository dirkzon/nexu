import { ClientProviderOptions } from "@nestjs/microservices/module/interfaces/clients-module.interface";

const { SERVICE, MESSAGEBUS_URL, MESSAGEBUS_QUEUE } = process.env;

export function RabbitConfig(): Array<ClientProviderOptions> {
  return [
  { 
    name: `${SERVICE}`, 
    transport: 5, //Transport.RMQ
    options: {
      urls: [MESSAGEBUS_URL],
      noAck: false,
      queue: `${MESSAGEBUS_QUEUE}`,
      queueOptions: {
        durable: true,
        },
      },
    },
  ];
}
