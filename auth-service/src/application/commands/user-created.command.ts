import { ICommand } from "@nestjs/cqrs";
import { IsString } from "class-validator";

export class UserCreatedCommand implements ICommand {
    @IsString()
    id: string;
    @IsString()
    name: string;
    @IsString()
    email: string;
    @IsString()
    password: string;

    constructor(
        id: string, 
        name: string, 
        email: string, 
        password: string
    ) {
        this.email = email;
        this.name = name;
        this.id = id;
        this.password = password;
    }
}