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
import {
  MongoOptionsConfig,
  MongoFeatureConfig,
} from './infrastructure/adaptors/mongoDB/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphQLConfig } from './infrastructure/adaptors/GraphQL/config';
import { GraphQLController } from './infrastructure/adaptors/GraphQL/controllers/GraqphQLController';
import { CommandHandlers } from './application/commandHandlers';
import { UserStore } from './application/ports/user.store';
import { RabbitMQStore } from './infrastructure/adaptors/RabbitMQ/controllers/RabbitMQStore';
import { EventHandlers } from './application/eventHandlers';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register(RabbitConfig()),
    CqrsModule,
    MongooseModule.forRoot(MongoOptionsConfig()),
    MongooseModule.forFeature(MongoFeatureConfig()),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>(GraphQLConfig()),
  ],
  controllers: [RabbitMQController],
  providers: [
    GraphQLController,
    ...QueryHandlers,
    ...CommandHandlers,
    ...EventHandlers,
    {
      provide: PostStore,
      useClass: MongoPostStore,
    },
    {
      provide: UserStore,
      useClass: RabbitMQStore,
    },
  ],
})
export class AppModule {}
