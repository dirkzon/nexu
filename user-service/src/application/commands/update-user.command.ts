import { ICommand } from "@nestjs/cqrs";
import { IsString, Length } from "class-validator";

export class UpdateUserCommand implements ICommand {
    @IsString()
    id: string;
    @IsString()
    @Length(2, 20)
    name: string;
    @IsString()
    @Length(0, 60)
    bio: string;

    constructor(id: string, name: string, bio: string) {
        this.name = name;
        this.bio = bio;
        this.id = id;
    }
}