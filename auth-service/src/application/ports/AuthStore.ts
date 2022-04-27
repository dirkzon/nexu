import { Injectable } from "@nestjs/common";
import { User } from "../../domain/models/user";

@Injectable()
export abstract class AuthStore {
    abstract getUserByData(user_data: string): Promise<User>;
    abstract getUserById(id: string): Promise<User>;
    abstract createUser(new_user: User): Promise<User>;
    abstract updateUser(user: User): Promise<User>;
}