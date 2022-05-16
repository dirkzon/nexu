import {
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadImageCommand } from '../../../application/commands/upload-image.command';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';

@Controller('images')
export class ImageController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('upload-image/:post_id')
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
}
