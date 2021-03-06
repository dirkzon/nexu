import { ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandHandlers } from './application/commandHanders';
import { AuthStore } from './application/ports/AuthStore';
import { GraphQLConfig } from './infrastructure/adaptors/GraphQL/config';
import { GraphQLController } from './infrastructure/adaptors/GraphQL/controllers/GraphQLController';
import {
  MongoFeatureConfig,
  MongoOptionsConfig,
} from './infrastructure/adaptors/MongoDB/config';
import { MongoAuthStore } from './infrastructure/adaptors/MongoDB/mongo.auth.store';
import { RabbitConfig } from './infrastructure/adaptors/RabbitMQ/config';
import { RabbitMQController } from './infrastructure/adaptors/RabbitMQ/controllers/rabbitMQController';
import { JwtConfig } from './infrastructure/config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register(RabbitConfig()),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>(GraphQLConfig()),
    JwtModule.register(JwtConfig()),
    CqrsModule,
    MongooseModule.forFeature(MongoFeatureConfig()),
    MongooseModule.forRoot(MongoOptionsConfig()),
  ],
  controllers: [RabbitMQController],
  providers: [
    ...CommandHandlers,
    GraphQLController,
    {
      provide: AuthStore,
      useClass: MongoAuthStore,
    }
  ],
})
export class AppModule {}
