import { ModelDefinition } from "@nestjs/mongoose";
import { PostEntity, PostSchema } from "./models/post.schema";
import { ImageEntity, ImageSchema } from "./models/image.schema";

export function MongoOptionsConfig(): string {
    return "mongodb://localhost/post-service";
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
        }
    ]
}