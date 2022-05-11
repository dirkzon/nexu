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
  @IsString()
  @IsNotEmpty()
  postId: string;

  constructor(
    postId: string,
    name: string,
    encoding: string,
    mimetype: string,
    buffer: Buffer,
  ) {
    this.postId = postId;
    this.name = name;
    this.encoding = encoding;
    this.mimetype = mimetype;
    this.buffer = buffer;
  }
}
