import { ICommand } from "@nestjs/cqrs";
import { IsString } from "class-validator";

export class DeleteUserCommand implements ICommand {
    @IsString()
    id: string;

    constructor(id: string) {
        this.id = id
    }
}