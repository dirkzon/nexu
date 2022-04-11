import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { SERVICE, MESSAGEBUS_URL, MESSAGEBUS_QUEUE } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    logger: console,
    transport: 5, //Transport.RMQ
    options: { 
        urls: ['amqp://guest:guest@rabbitmq:5672/'],
        noAck: false,
        queue: `user_queue`,
        queueOptions: { 
          durable: true,
        },
      },
  }); 

  await app.startAllMicroservices();
  await app.listen(2000).then(() => console.log(`${SERVICE} started`));
}
bootstrap();
