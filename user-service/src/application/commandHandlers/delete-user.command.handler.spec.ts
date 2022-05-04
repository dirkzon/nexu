import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { DeleteUserCommand } from '../commands/delete-user.command';
import { UserStore } from '../ports/user.store';
import { DeleteUserCommandHandler } from './delete-user.command.handler';

describe('Delete user command handler tests', () => {
  let userStore: UserStore;
  let eventBusSpy: jest.SpyInstance;
  let deleteUserCommandHandler: DeleteUserCommandHandler;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: UserStore,
          useFactory: () => jest.fn(),
        },
      ],
    }).compile();

    userStore = module.get<UserStore>(UserStore);
    const eventBus = module.get<EventBus>(EventBus);
    eventBusSpy = jest.spyOn(eventBus, 'publish');

    deleteUserCommandHandler = new DeleteUserCommandHandler(
      userStore,
      eventBus,
    );

    userStore.DeleteUser = jest.fn(() => Promise.resolve());
  });

  it('should exist', () => {
    expect(userStore).toBeDefined();
    expect(deleteUserCommandHandler).toBeDefined();
  });

  it('delete user with valid id', async () => {
    const command: DeleteUserCommand = { id: '12345' };
    await deleteUserCommandHandler.execute(command);
    expect(userStore.DeleteUser).toHaveBeenCalledTimes(1);
    expect(eventBusSpy).toHaveBeenCalledTimes(1);
  });

  it('delete user with invalid id', async () => {
    expect.assertions(1);
    try {
      const command = new DeleteUserCommand('');
      await deleteUserCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('id should not be empty');
    }
  });
});
