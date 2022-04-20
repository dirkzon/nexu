import { ICommand } from "@nestjs/cqrs";
import { IsArray, IsString } from "class-validator";

export class LoginCommand implements ICommand {
    @IsString()
    readonly user: string;
    @IsString()
    readonly password: string;
    @IsArray()
    readonly scope: string[]

    constructor(user: string, password: string, scope: string[]) {
        this.user = user;
        this.password = password;
        this.scope = scope;
    }
} 