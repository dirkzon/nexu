import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { RabbitConfig } from './infrastructure/adaptors/RabbitMQ/config';
import { RabbitMQController } from './infrastructure/adaptors/RabbitMQ/controllers/RabbitMQController';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './application/queryHandlers';

@Module({
  imports: [
    ClientsModule.register(RabbitConfig()),
    CqrsModule,
  ],
  controllers: [RabbitMQController],
  providers: [...QueryHandlers],
})
export class AppModule {}
