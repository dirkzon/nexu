import { ModelDefinition } from '@nestjs/mongoose';
import { PostEntity, PostSchema } from './models/post.schema';
import { ImageEntity, ImageSchema } from './models/image.schema';
import { UserEntity, UserSchema } from './models/user.schema';
import { AvatarEntity, AvatarSchema } from './models/avatar.schema';

const { NODE_ENV } = process.env;

export function MongoOptionsConfig(): string {
  return NODE_ENV === 'prod'
    ? 'mongodb://post-service-database/post-service'
    : 'mongodb://localhost/post-service';
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
    {
      name: UserEntity.name,
      schema: UserSchema,
    },
    {
      name: AvatarEntity.name,
      schema: AvatarSchema,
    },
  ];
}
