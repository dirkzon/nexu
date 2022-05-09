import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadImageCommand implements ICommand {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  encoding: string;
  @IsString()
  @IsNotEmpty()
  mimetype: string;
  @IsNotEmpty()
  buffer: Buffer;

  constructor(
    name: string,
    encoding: string,
    mimetype: string,
    buffer: Buffer,
  ) {
    this.name = name;
    this.encoding = encoding;
    this.mimetype = mimetype;
    this.buffer = buffer;
  }
}
