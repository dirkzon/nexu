import { ModelDefinition } from '@nestjs/mongoose';
import { PostEntity, PostSchema } from './models/post.schema';
import { ImageEntity, ImageSchema } from './models/image.schema';

const { NODE_ENV } = process.env;

export function MongoOptionsConfig(): string {
  return NODE_ENV === 'prod'
    ? 'mongodb://post-mongo/auth-service'
    : 'mongodb://localhost/auth-service';
}

export function MongoFeatureConfig(): ModelDefinition[] {
  return [
    {
      name: PostEntity.name,
      schema: PostSchema,
    },
    {
      name: ImageEntity.name,
      schema: ImageSchema,
    },
  ];
}
