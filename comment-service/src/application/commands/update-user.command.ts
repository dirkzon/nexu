import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserCommand implements ICommand {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
