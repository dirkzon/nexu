import { Injectable } from "@nestjs/common";
import { User } from "src/domain/models/user";

@Injectable()
export abstract class AuthStore {
    abstract getUserByData(user_data: string): Promise<User>;
    abstract getUserById(id: string): Promise<User>;
}