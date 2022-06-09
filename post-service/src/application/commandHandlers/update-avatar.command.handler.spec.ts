import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateAvatarCommand } from '../commands/update-avatar.command';
import { PostStore } from '../ports/post.store';
import { UpdateAvatarCommandHandler } from './update-avatar.command.handler';

describe('Update avatar command handler tests', () => {
  let postStore: PostStore;
  let updateAvatarCommandHandler: UpdateAvatarCommandHandler;

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

    updateAvatarCommandHandler = new UpdateAvatarCommandHandler(postStore);

    postStore.UpdateAvatar = jest.fn(() => {
      return Promise.resolve();
    });
  });

  it('should exist', () => {
    expect(postStore).toBeDefined();
    expect(updateAvatarCommandHandler).toBeDefined();
  });

  it('Update valid avatar', async () => {
    postStore.HasUserLiked = jest.fn(() => Promise.resolve(false));
    const command = new UpdateAvatarCommand('54321', '12345', 300, 300, 'url');
    await updateAvatarCommandHandler.execute(command);
    expect(postStore.UpdateAvatar).toHaveBeenCalledTimes(1);
  });

  it('Update avatar with invalid user id', async () => {
    expect.assertions(1);
    try {
      const command = new UpdateAvatarCommand('5432', '', 300, 300, 'url');
      await updateAvatarCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('userId should not be empty');
    }
  });

  it('Update avatar with invalid id', async () => {
    expect.assertions(1);
    try {
      const command = new UpdateAvatarCommand('', '12345', 300, 300, 'url');
      await updateAvatarCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('id should not be empty');
    }
  });

  it('Update avatar with invalid url', async () => {
    expect.assertions(1);
    try {
      const command = new UpdateAvatarCommand('54321', '12345', 300, 300, '');
      await updateAvatarCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('url should not be empty');
    }
  });
});
