import { Module } from '@nestjs/common';
import { QueryHandlers } from './application/queryHanders';

@Module({
  imports: [],
  controllers: [],
  providers: [...QueryHandlers],
})
export class AppModule {}
