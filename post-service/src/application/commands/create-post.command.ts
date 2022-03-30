import { ICommand } from "@nestjs/cqrs";
import { IsString, Length } from "class-validator";

export class CreatePostCommand implements ICommand {
    @IsString()
    readonly createdBy: string;
    @IsString()
    @Length(5, 100)
    readonly description: string;

    constructor(createdBy: string, description: string) {
        this.createdBy = createdBy;
        this.description = description;
    }
}