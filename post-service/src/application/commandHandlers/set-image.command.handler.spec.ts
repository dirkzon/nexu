import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { Post } from '../../domain/models/Post';
import { SetImageCommand } from '../commands/set-image.command';
import { PostStore } from '../ports/post.store';
import { SetImageCommandHandler } from './set-image.command.handler';

describe('Set image command handler tests', () => {
  let postStore: PostStore;
  let setImageCommandHandler: SetImageCommandHandler;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: PostStore,
          useFactory: () => jest.fn(),
        },
      ],
    }).compile();

    postStore = module.get<PostStore>(PostStore);

    setImageCommandHandler = new SetImageCommandHandler(postStore);

    postStore.AddImage = jest.fn(() => Promise.resolve(new Post()));
  });

  it('should exist', () => {
    expect(postStore).toBeDefined();
    expect(setImageCommandHandler).toBeDefined();
  });

  it('Delete valid post', async () => {
    const command = new SetImageCommand('12345', '54321', 300, 300, 'url');
    await setImageCommandHandler.execute(command);
    expect(postStore.AddImage).toHaveBeenCalledTimes(1);
  });

  it('Set image with invalid user id', async () => {
    expect.assertions(1);
    try {
      const command = new SetImageCommand('', '54321', 300, 300, 'url');
      await setImageCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('id should not be empty');
    }
  });

  it('Set image with invalid post id', async () => {
    expect.assertions(1);
    try {
      const command = new SetImageCommand('12345', '', 300, 300, 'url');
      await setImageCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('postId should not be empty');
    }
  });

  it('Set image with invalid url', async () => {
    expect.assertions(1);
    try {
      const command = new SetImageCommand('12345', '54321', 300, 300, '');
      await setImageCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('url should not be empty');
    }
  });
});
