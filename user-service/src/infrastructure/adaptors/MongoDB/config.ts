import { ModelDefinition } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './models/user.schema';
import { ImageEntity, ImageSchema } from './models/image.schema';

const { NODE_ENV } = process.env;

export function MongoOptionsConfig(): string {
  return NODE_ENV === 'prod'
    ? 'mongodb://user-mongo/user-service'
    : 'mongodb://localhost/user-service';
}

export function MongoFeatureConfig(): ModelDefinition[] {
  return [
    {
      name: UserEntity.name,
      schema: UserSchema,
    },
    {
      name: ImageEntity.name,
      schema: ImageSchema,
    },
  ];
}
