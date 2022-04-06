import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { UserStore } from "src/application/ports/user.store";
import { UserDocument, UserEntity } from "./models/user.schema";
import { User } from "src/domain/models/User";

@Injectable()
export class MongoUserStore implements UserStore {
    constructor(
        @InjectModel(UserEntity.name) 
        private readonly model: Model<UserDocument>
    ) {}

    async CreateUser(new_user: User): Promise<User> {
        const user = new this.model(new_user);
        return Promise.resolve(await user.save());
    }

    async GetUserById(id: string): Promise<User> {
        return Promise.resolve(await this.model.findOne({id: id}));
    }
}