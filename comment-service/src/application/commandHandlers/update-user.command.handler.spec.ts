import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateUserCommand } from '../commands/update-user.command';
import { CommentStore } from '../ports/comment.store';
import { UpdateUserCommandHandler } from './update-user.command.handler';

describe('Update user command handler tests', () => {
  let commentStore: CommentStore;
  let updateUserCommandHandler: UpdateUserCommandHandler;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: CommentStore,
          useFactory: () => jest.fn(),
        },
      ],
    }).compile();

    commentStore = module.get<CommentStore>(CommentStore);

    updateUserCommandHandler = new UpdateUserCommandHandler(commentStore);

    commentStore.UpdateUser = jest.fn(() => Promise.resolve(null));
  });

  it('should exist', () => {
    expect(commentStore).toBeDefined();
    expect(updateUserCommandHandler).toBeDefined();
  });

  it('Update valid user', async () => {
    const command = new UpdateUserCommand('12345', 'John Doe');
    await updateUserCommandHandler.execute(command);
    expect(commentStore.UpdateUser).toHaveBeenCalledTimes(1);
  });

  it('Update user without name', async () => {
    expect.assertions(1);
    try {
      const command = new UpdateUserCommand('', 'email@mail.com');
      await updateUserCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('name should not be empty');
    }
  });
});
