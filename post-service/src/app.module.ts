import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { RabbitMQController } from './infrastructure/adaptors/RabbitMQ/controllers/RabbitMQController';

@Module({
  imports: [ClientsModule.register([
    { 
      name: 'POST_SERVICE', 
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672/'],
        queue: 'post_queue',
        queueOptions: {
          durable: true,
              },
        },
     },
   ]),
  ],
  controllers: [RabbitMQController],
  providers: [],
})
export class AppModule {}
