import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { RabbitConfig } from './infrastructure/adaptors/RabbitMQ/config';
import { RabbitMQController } from './infrastructure/adaptors/RabbitMQ/controllers/RabbitMQController';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './application/queryHandlers';
import { PostStore } from './application/ports/post.store';
import { MongoPostStore } from './infrastructure/adaptors/mongoDB/mongo.post.store';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoOptionsConfig, MongoFeatureConfig } from './infrastructure/adaptors/mongoDB/config';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: "../.env", isGlobal: true}),
    ClientsModule.register(RabbitConfig()),
    CqrsModule,
    MongooseModule.forRoot(MongoOptionsConfig()),
    MongooseModule.forFeature(MongoFeatureConfig()),
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
