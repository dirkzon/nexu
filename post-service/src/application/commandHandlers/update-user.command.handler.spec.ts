import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateUserCommand } from '../commands/update-user.command';
import { PostStore } from '../ports/post.store';
import { UpdateUserCommandHandler } from './update-user.command.handler';

describe('Update avatar command handler tests', () => {
  let postStore: PostStore;
  let updateUserCommandHandler: UpdateUserCommandHandler;

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

    updateUserCommandHandler = new UpdateUserCommandHandler(postStore);

    postStore.UpdateUser = jest.fn(() => {
      return Promise.resolve();
    });
  });

  it('should exist', () => {
    expect(postStore).toBeDefined();
    expect(updateUserCommandHandler).toBeDefined();
  });

  it('Update valid avatar', async () => {
    postStore.HasUserLiked = jest.fn(() => Promise.resolve(false));
    const command = new UpdateUserCommand('name', '12345');
    await updateUserCommandHandler.execute(command);
    expect(postStore.UpdateUser).toHaveBeenCalledTimes(1);
  });

  it('Update avatar with invalid name', async () => {
    expect.assertions(1);
    try {
      const command = new UpdateUserCommand('', '5432');
      await updateUserCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('name should not be empty');
    }
  });

  it('Update avatar with invalid id', async () => {
    expect.assertions(1);
    try {
      const command = new UpdateUserCommand('name', '');
      await updateUserCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('id should not be empty');
    }
  });
});
