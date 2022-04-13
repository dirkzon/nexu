import { Injectable } from "@nestjs/common";
import { User } from "../../domain/models/User";

@Injectable()
export abstract class UserStore {
    abstract GetUserById(id: string): Promise<User>;
    abstract CreateUser(new_user: User): Promise<User>;
} 