import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from "@Nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    logger: console,
    transport: Transport.RMQ,
    options: { 
         urls: ["amqp://guest:guest@localhost:5672/"],
         noAck: false,
         queue: "post_queue",
         queueOptions: { 
            durable: true,
           },
          },
  }); 
   await app.listen().then(() => console.log(`Post-Service started`));
}
bootstrap();
