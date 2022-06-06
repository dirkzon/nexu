import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('starting api-gateway');
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(5000).then(() => console.log(`api-gateway started`));
}
bootstrap();
