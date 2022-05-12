import { ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLConfig } from './infrastructure/adaptors/Graphql/config';
import { GraphQLController } from './infrastructure/adaptors/Graphql/controllers/graphQLController';
import { AzureStorageModule } from '@nestjs/azure-storage';
import { AzureConfig } from './infrastructure/adaptors/Azure/config';
import { MediaStore } from './application/ports/mediaStore';
import { AzureBlobStore } from './infrastructure/adaptors/Azure/AzureBlobStore';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './application/commandHandlers';
import { ClientsModule } from '@nestjs/microservices';
import { EventsHandlers } from './application/eventHandlers';
import { RabbitConfig } from './infrastructure/adaptors/RabbitMQ/config';

@Module({
  imports: [
    ClientsModule.register(RabbitConfig()),
    AzureStorageModule.withConfig(AzureConfig()),
    ConfigModule.forRoot(),
    CqrsModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>(GraphQLConfig()),
  ],
  controllers: [],
  providers: [
    ...CommandHandlers,
    ...EventsHandlers,
    GraphQLController,
    {
      provide: MediaStore,
      useClass: AzureBlobStore,
    },
  ],
})
export class AppModule {}
