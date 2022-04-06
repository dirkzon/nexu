import { ICommand } from "@nestjs/cqrs";
import { IsString, Length } from "class-validator";

export class CreateUserCommand implements ICommand {
    @IsString()
    @Length(2, 20)
    name: string;
    @IsString()
    email: string;
    @IsString()
    @Length(0, 60)
    bio: string;
    @IsString()
    password: string;

    constructor(name: string, email: string, bio: string, password: string) {
        this.name = name;
        this.email = email;
        this.bio = bio;
        this.password = password;
    }
}