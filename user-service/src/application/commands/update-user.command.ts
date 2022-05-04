import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserCommand implements ICommand {
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  name: string;
  @IsNotEmpty()
  @IsString()
  @Length(0, 60)
  bio: string;

  constructor(id: string, name: string, bio: string) {
    this.name = name;
    this.bio = bio;
    this.id = id;
  }
}
