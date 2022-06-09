import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { DeleteUserCommand } from '../commands/delete-user.command';
import { AuthStore } from '../ports/AuthStore';
import { DeleteUserCommandHandler } from './delete-user.command.handler';

describe('delete user command handler tests', () => {
  let authStore: AuthStore;
  let deleteUserCommandHandler: DeleteUserCommandHandler;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: AuthStore,
          useFactory: () => jest.fn(),
        },
      ],
    }).compile();

    authStore = module.get<AuthStore>(AuthStore);

    deleteUserCommandHandler = new DeleteUserCommandHandler(authStore);

    authStore.deleteUser = jest.fn(() => Promise.resolve());
  });

  it('should exist', () => {
    expect(authStore).toBeDefined();
    expect(deleteUserCommandHandler).toBeDefined();
  });

  it('delete valid user', async () => {
    const command = new DeleteUserCommand('12345');
    await deleteUserCommandHandler.execute(command);
    expect(authStore.deleteUser).toHaveBeenCalledTimes(1);
  });
});
