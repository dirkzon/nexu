import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePostCommand implements ICommand {
  @IsNotEmpty()
  @IsString()
  readonly createdBy: string;
  @IsString()
  @IsNotEmpty()
  @Length(5, 60)
  readonly description: string;

  constructor(createdBy: string, description: string) {
    this.createdBy = createdBy;
    this.description = description;
  }
}
