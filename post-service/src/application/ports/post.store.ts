import { Injectable } from "@nestjs/common";
import { Post } from "../../domain/models/Post";

@Injectable()
export abstract class PostStore {
    abstract GetPostById(id: string): Promise<Post>;
    abstract CreatePost(new_post: Post): Promise<Post>; 
}