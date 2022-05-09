import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ReadStream } from 'fs';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { CommandBus } from '@nestjs/cqrs';
import { UploadImageCommand } from '../../../../application/commands/upload-image.command';

@Resolver(() => Boolean)
export class GraphQLController {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    upload: FileUpload,
  ) {
    const { filename, encoding, mimetype, createReadStream } = upload.file;

    const rs: ReadStream = await createReadStream();
    const buff = Array<any>();
    rs.on('data', (chunk) => buff.push(chunk));
    rs.on('end', async () => {
      this.commandBus
        .execute(
          new UploadImageCommand(
            filename,
            encoding,
            mimetype,
            Buffer.concat(buff),
          ),
        )
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    });
  }
}
