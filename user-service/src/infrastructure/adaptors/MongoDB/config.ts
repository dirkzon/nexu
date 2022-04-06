import { ModelDefinition } from "@nestjs/mongoose";
import { UserEntity, UserSchema } from "./models/user.schema";
import { ImageEntity, ImageSchema } from "./models/image.schema";

export function MongoOptionsConfig(): string {
    return "mongodb://localhost/user-service";
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
        }
    ]
}