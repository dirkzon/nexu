import { CommentEntity, CommentSchema } from './models/comment.schema';
import { UserEntity, UserSchema } from './models/user.schema';
import { ModelDefinition } from '@nestjs/mongoose';

const { NODE_ENV } = process.env;

export function MongoOptionsConfig(): string {
  return NODE_ENV === 'prod'
    ? 'mongodb://comment-service-database/comment-service'
    : 'mongodb://localhost/comment-service';
}

export function MongoFeatureConfig(): ModelDefinition[] {
  return [
    {
      name: CommentEntity.name,
      schema: CommentSchema,
    },
    {
      name: UserEntity.name,
      schema: UserSchema,
    },
  ];
}
