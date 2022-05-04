import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserCommand implements ICommand {
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  name: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsString()
  @Length(0, 60)
  bio: string;
  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(name: string, email: string, bio: string, password: string) {
    this.name = name;
    this.email = email;
    this.bio = bio;
    this.password = password;
  }
}
