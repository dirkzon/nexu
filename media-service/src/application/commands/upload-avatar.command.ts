import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadAvatarCommand implements ICommand {
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
  userId: string;
  @IsString()
  @IsNotEmpty()
  avatarId: string;

  constructor(
    userId: string,
    name: string,
    encoding: string,
    mimetype: string,
    buffer: Buffer,
    avatar_id: string,
  ) {
    this.userId = userId;
    this.name = name;
    this.encoding = encoding;
    this.mimetype = mimetype;
    this.buffer = buffer;
    this.avatarId = avatar_id;
  }
}
