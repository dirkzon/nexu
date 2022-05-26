import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { SERVICE } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(7000).then(() => console.log(`${SERVICE} started`));
}
bootstrap();
