import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceConfig } from './infrastructure/adaptors/RabbitMQ/config';

async function bootstrap() {
  console.log('starting auth-service');
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(MicroserviceConfig()); 

  await app.startAllMicroservices();
  await app.listen(4000).then(() => console.log(`auth-service started`));
}
bootstrap();
