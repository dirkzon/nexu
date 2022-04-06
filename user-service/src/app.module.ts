import { ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandHandlers } from './application/commandHandlers';
import { UserStore } from './application/ports/user.store';
import { QueryHandlers } from './application/queryHandlers';
import { GraphQLConfig } from './infrastructure/adaptors/GraphQL/config';
import { GraphQLController } from './infrastructure/adaptors/GraphQL/controllers/graphQLController';
import { MongoFeatureConfig, MongoOptionsConfig } from './infrastructure/adaptors/MongoDB/config';
import { MongoUserStore } from './infrastructure/adaptors/MongoDB/mongo.userStore';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>(GraphQLConfig()),
    CqrsModule,
    MongooseModule.forRoot(MongoOptionsConfig()),
    MongooseModule.forFeature(MongoFeatureConfig()),
  ],
  controllers: [],
  providers: [
    GraphQLController,
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: UserStore,
      useClass: MongoUserStore,
    }
  ],
})
export class AppModule {}
