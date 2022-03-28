import { IQuery } from "@nestjs/cqrs";
import { IsString, Length } from "class-validator";

export class GetPostByIdQuery implements IQuery {
    @IsString()
    readonly _id: string;

    constructor(id: string) {   
        this._id = id;
    }
}