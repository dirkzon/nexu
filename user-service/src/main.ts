import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceConfig } from './infrastructure/adaptors/RabbitMQ/config';

const { SERVICE } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  MicroserviceConfig().forEach((config) => {
    app.connectMicroservice(config);
  });

  await app.startAllMicroservices();
  await app.listen(2000).then(() => console.log(`${SERVICE} started`));
}
bootstrap();
