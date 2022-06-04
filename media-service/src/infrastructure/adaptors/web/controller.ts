import {
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadImageCommand } from '../../../application/commands/upload-image.command';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import { UploadAvatarCommand } from '../../../application/commands/upload-avatar.command';
import { AuthGuard } from './guard';
import { JWT } from './jwtheader';

@Controller('images')
export class ImageController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('upload-image/:post_id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('post_id') post_id: string,
  ) {
    const output = [];
    for (const image of files) {
      const { fieldname, encoding, mimetype, buffer } = image;
      if (!mimetype.includes('image')) {
        throw new Error('Wrong filetype');
      }
      output.push(
        await this.commandBus.execute(
          new UploadImageCommand(
            post_id,
            fieldname,
            encoding,
            mimetype,
            buffer,
          ),
        ),
      );
    }
    return output;
  }

  @Post('upload-avatar/:avatar_id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('file'))
  async updateAvatar(
    @UploadedFiles() image: Array<Express.Multer.File>,
    @JWT() user,
    @Param('avatar_id') avatar_id: string,
  ) {
    const { fieldname, encoding, mimetype, buffer } = image[0];
    if (!mimetype.includes('image')) {
      throw new Error('Wrong filetype');
    }
    return await this.commandBus.execute(
      new UploadAvatarCommand(
        user.id,
        fieldname,
        encoding,
        mimetype,
        buffer,
        avatar_id,
      ),
    );
  }
}
