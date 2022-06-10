import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { User } from '../../domain/models/User';
import { UpdateUserCommand } from '../commands/update-user.command';
import { AuthStore } from '../ports/AuthStore';
import { UpdateUserCommandHandler } from './update-user.command.handler';

describe('Update user command handler tests', () => {
  let authStore: AuthStore;
  let updateUserCommandHandler: UpdateUserCommandHandler;

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

    updateUserCommandHandler = new UpdateUserCommandHandler(authStore);

    authStore.updateUser = jest.fn(() => Promise.resolve(new User()));
    authStore.getUserById = jest.fn(() => Promise.resolve(new User()));
  });

  it('should exist', () => {
    expect(authStore).toBeDefined();
    expect(updateUserCommandHandler).toBeDefined();
  });

  it('Update valid user', async () => {
    const command = new UpdateUserCommand('12345', 'John Doe');
    const user = await updateUserCommandHandler.execute(command);
    expect(authStore.updateUser).toHaveBeenCalledTimes(1);
    expect(user).toBeDefined();
  });
});
