import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { SERVICE } = process.env;

async function bootstrap() {
  console.log('starting media-service');
  const app = await NestFactory.create(AppModule);
  //app.use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 3 }));
  await app.listen(1000).then(() => console.log(`${SERVICE} started`));
}
bootstrap();
