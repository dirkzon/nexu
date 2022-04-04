import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { AuthStore } from "src/application/ports/AuthStore";
import { User } from "src/domain/models/user";
import { AuthDocument, AuthEntity } from "./models/auth.schema";

@Injectable()
export class MongoAuthStore implements AuthStore {
    constructor(
        @InjectModel(AuthEntity.name) 
        private readonly model: Model<AuthDocument>
    ) {}

    async getUserByData(user_data: string): Promise<User> {
        return Promise.resolve(await this.model.findOne({
            $or: [
                {name: user_data}, 
                {email: user_data}
            ]
        }));
    }

    async getUserById(id: string): Promise<User> {
        return Promise.resolve(await this.model.findOne({id: id}));
    }
}