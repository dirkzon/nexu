import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { PostEntity, PostDocument } from "./models/post.schema"; 
import { InjectModel } from "@nestjs/mongoose";
import { PostStore } from "../../../application/ports/post.store";
import { Post } from "../../../domain/models/Post";

@Injectable()
export class MongoPostStore implements PostStore {
    constructor(
        @InjectModel(PostEntity.name) 
        private readonly model: Model<PostDocument>
    ) {}

    async CreatePost(new_post: Post): Promise<Post> {
        const post = new this.model(new_post);
        return Promise.resolve(await post.save());
    }

    async GetPostById(id: string): Promise<Post> {
        return Promise.resolve(await this.model.findOne({id: id}));
    }
}