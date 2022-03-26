import { IQuery } from "@nestjs/cqrs";

export class GetPostByIdQuery implements IQuery {
    constructor(readonly id: string) {}
}