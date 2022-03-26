import { Injectable } from "@nestjs/common";
import { Post } from "src/domain/models/Post";

@Injectable()
export abstract class PostStore {
    abstract GetPostById(id: string): Promise<Post>;
}