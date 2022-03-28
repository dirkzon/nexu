import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { PostStore } from "src/application/ports/post.store";
import { PostEntity, PostDocument } from "./models/post.schema"; 
import { Post } from "src/domain/models/Post";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class MongoPostStore implements PostStore {
    constructor(
        @InjectModel(PostEntity.name) 
        private readonly model: Model<PostDocument>
    ) {}

    async GetPostById(id: string): Promise<Post> {
        return Promise.resolve(await this.model.findOne({id: id}));
    }
}