import { Injectable } from "@nestjs/common";
import { PostStore } from "src/application/ports/post.store";
import { Post } from "src/domain/models/Post";

@Injectable()
export class MongoPostStore implements PostStore {
    GetPostById(id: string): Promise<Post> {
        return new Promise((resolve, reject) => {
            resolve(undefined);
        }) 
    }
}