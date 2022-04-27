import { ICommand } from "@nestjs/cqrs";
import { IsString } from "class-validator";

export class UpdateUserCommand implements ICommand {
    @IsString()
    id: string;
    @IsString()
    name: string;

    constructor(id: string, name: string,) {
        this.name = name;
        this.id = id;
    }
}