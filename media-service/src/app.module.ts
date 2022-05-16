import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AzureStorageModule } from '@nestjs/azure-storage';
import { AzureConfig } from './infrastructure/adaptors/Azure/config';
import { MediaStore } from './application/ports/mediaStore';
import { AzureBlobStore } from './infrastructure/adaptors/Azure/AzureBlobStore';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './application/commandHandlers';
import { ClientsModule } from '@nestjs/microservices';
import { EventsHandlers } from './application/eventHandlers';
import { RabbitConfig } from './infrastructure/adaptors/RabbitMQ/config';
import { ImageController } from './infrastructure/adaptors/web/controller';

@Module({
  imports: [
    ClientsModule.register(RabbitConfig()),
    AzureStorageModule.withConfig(AzureConfig()),
    ConfigModule.forRoot(),
    CqrsModule,
    //GraphQLModule.forRoot<ApolloFederationDriverConfig>(GraphQLConfig()),
  ],
  controllers: [ImageController],
  providers: [
    ...CommandHandlers,
    ...EventsHandlers,
    {
      provide: MediaStore,
      useClass: AzureBlobStore,
    },
  ],
})
export class AppModule {}
