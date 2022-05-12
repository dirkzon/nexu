import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { CommandBus } from '@nestjs/cqrs';
import { UploadImageCommand } from '../../../../application/commands/upload-image.command';
import { Image } from '../models/Image';
import { getBufferFromStream } from '../../../../domain/services/image.service';

@Resolver(() => Boolean)
export class GraphQLController {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => [Image])
  async uploadImages(
    @Args({ name: 'images', type: () => [GraphQLUpload] })
    uploads: FileUpload[],
    // @Args({ name: 'post_id', type: () => String }) postId: string,
  ) {
    const output = [];
    for (const image of uploads) {
      const { filename, encoding, mimetype, createReadStream } =
        await image.promise;
      if (!mimetype.includes('image')) {
        throw new Error('Wrong filetype');
      }
      const buff = await getBufferFromStream(createReadStream());
      output.push(
        await this.commandBus.execute(
          new UploadImageCommand('1234', filename, encoding, mimetype, buff),
        ),
      );
    }
    return output;
  }
}
