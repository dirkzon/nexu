import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceConfig } from './infrastructure/adaptors/RabbitMQ/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  MicroserviceConfig().forEach((config) => {
    app.connectMicroservice(config);
  });

  await app.startAllMicroservices();
  await app.listen(3000).then(() => console.log(`post-service started`));
}
bootstrap();
