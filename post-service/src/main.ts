import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from "@Nestjs/microservices";

const { SERVICE, MESSAGEBUS_URL, MESSAGEBUS_QUEUE } = process.env;

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    logger: console,
    transport: Transport.RMQ,
    options: { 
         urls: [MESSAGEBUS_URL],
         noAck: false,
         queue: `${MESSAGEBUS_QUEUE}`,
         queueOptions: { 
            durable: true,
           },
          },
  }); 
  await app.listen().then(() => console.log(`${SERVICE} started`));
}
bootstrap();
