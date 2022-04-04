import { ICommand } from "@nestjs/cqrs";
import { IsString } from "class-validator";

export class LoginCommand implements ICommand {
    @IsString()
    readonly user: string;
    @IsString()
    readonly password: string;

    constructor(user: string, password: string) {
        this.user = user;
        this.password = password;
    }
} 