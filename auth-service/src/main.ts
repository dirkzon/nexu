import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const { SERVICE, MESSAGEBUS_URL, MESSAGEBUS_QUEUE } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
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

  await app.startAllMicroservices();
  await app.listen(4000).then(() => console.log(`${SERVICE} started`));
}
bootstrap();
