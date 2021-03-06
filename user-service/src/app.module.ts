import { ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandHandlers } from './application/commandHandlers';
import { EventsHandlers } from './application/eventHandlers';
import { UserStore } from './application/ports/user.store';
import { QueryHandlers } from './application/queryHandlers';
import { GraphQLConfig } from './infrastructure/adaptors/GraphQL/config';
import { GraphQLController } from './infrastructure/adaptors/GraphQL/controllers/graphQLController';
import {
  MongoFeatureConfig,
  MongoOptionsConfig,
} from './infrastructure/adaptors/MongoDB/config';
import { MongoUserStore } from './infrastructure/adaptors/MongoDB/mongo.userStore';
import { RabbitConfig } from './infrastructure/adaptors/RabbitMQ/config';
import { RabbitMQController } from './infrastructure/adaptors/RabbitMQ/controllers/RabbitMQController';

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
    RabbitMQController,
    GraphQLController,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventsHandlers,
    {
      provide: UserStore,
      useClass: MongoUserStore,
    },
  ],
})
export class AppModule {}
