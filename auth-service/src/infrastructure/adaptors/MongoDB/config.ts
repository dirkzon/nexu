import { ModelDefinition } from '@nestjs/mongoose';
import { AuthEntity, AuthSchema } from './models/auth.schema';

const { NODE_ENV } = process.env;

export function MongoOptionsConfig(): string {
  const url =
    NODE_ENV === 'prod'
      ? 'mongodb://auth-service-database/auth-service'
      : 'mongodb://localhost/auth-service';
  console.log(url);
  return url;
}

export function MongoFeatureConfig(): ModelDefinition[] {
  return [
    {
      name: AuthEntity.name,
      schema: AuthSchema,
    },
  ];
}
