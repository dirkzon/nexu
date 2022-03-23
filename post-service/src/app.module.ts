import { Module } from '@nestjs/common';
import { QueryHandlers } from './application/queryHanders';
import { CqrsModule } from "@nestjs/cqrs";

@Module({
  imports: [CqrsModule],
  controllers: [],
  providers: [...QueryHandlers],
})
export class AppModule {}
