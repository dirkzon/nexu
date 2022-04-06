import { ModelDefinition } from "@nestjs/mongoose";
import { AuthEntity, AuthSchema } from "./models/auth.schema";

export function MongoOptionsConfig(): string {
    return "mongodb://localhost/auth-service";
}

export function MongoFeatureConfig(): ModelDefinition[] {
    return [
        {
            name: AuthEntity.name,
            schema: AuthSchema,
        }
    ]
}