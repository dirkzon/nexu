import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { AuthDocument, AuthEntity } from "./models/auth.schema";
import { User } from "../../../domain/models/user";
import { AuthStore } from "../../../application/ports/AuthStore";

@Injectable()
export class MongoAuthStore implements AuthStore {
    constructor(
        @InjectModel(AuthEntity.name) 
        private readonly model: Model<AuthDocument>
    ) {}

    async createUser(new_user: User): Promise<User> {
        const user = new this.model(new_user);
        return Promise.resolve(await user.save());
    }

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