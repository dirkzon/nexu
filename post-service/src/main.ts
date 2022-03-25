import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    logger: console,
    transport: Transport.RMQ,
    options: { 
         urls: ['amqp://guest:guest@localhost:5672/'],
         queue: 'post_queue',
         queueOptions: { 
            durable: true,
           },
          },
  }); 
   await app.listen().then(() => console.log("service started"));
}
bootstrap();
