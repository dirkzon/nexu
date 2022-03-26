import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { RabbitConfig } from './infrastructure/adaptors/RabbitMQ/config';
import { RabbitMQController } from './infrastructure/adaptors/RabbitMQ/controllers/RabbitMQController';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './application/queryHandlers';
import { PostStore } from './application/ports/post.store';
import { MongoPostStore } from './infrastructure/adaptors/mongoDB/mongo.post.store';

@Module({
  imports: [
    ClientsModule.register(RabbitConfig()),
    CqrsModule,
  ],
  controllers: [RabbitMQController],
  providers: [
    ...QueryHandlers,
    { 
      provide: PostStore, 
      useClass: MongoPostStore
    }
  ],
})
export class AppModule {}
