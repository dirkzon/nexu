import { ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLConfig } from './infrastructure/adaptors/GraphQL/config';
import { GraphqlController } from './infrastructure/adaptors/GraphQL/controllers/GraphQLController';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MongoFeatureConfig,
  MongoOptionsConfig,
} from './infrastructure/adaptors/MongoDB/config';
import { CommentStore } from './application/ports/comment.store';
import { MongoCommentStore } from './infrastructure/adaptors/MongoDB/mongo.comment.store';
import { ClientsModule } from '@nestjs/microservices';
import { RabbitConfig } from './infrastructure/adaptors/RabbitMQ/config';
import { ConfigModule } from '@nestjs/config';
import { UserStore } from './application/ports/user.store';
import { RabbitMQUserStore } from './infrastructure/adaptors/RabbitMQ/rabbit.user.store';
import { CommandHandlers } from './application/commandHandlers';
import { QueryHandlers } from './application/queryHandlers';
import { RabbitMQController } from './infrastructure/adaptors/RabbitMQ/RabbitMQController';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register(RabbitConfig()),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>(GraphQLConfig()),
    CqrsModule,
    MongooseModule.forRoot(MongoOptionsConfig()),
    MongooseModule.forFeature(MongoFeatureConfig()),
  ],
  controllers: [RabbitMQController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    GraphqlController,
    {
      provide: CommentStore,
      useClass: MongoCommentStore,
    },
    {
      provide: UserStore,
      useClass: RabbitMQUserStore,
    },
  ],
})
export class AppModule {}
