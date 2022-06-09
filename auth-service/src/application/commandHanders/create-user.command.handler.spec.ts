import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { User } from '../../domain/models/User';
import { UserCreatedCommand } from '../commands/user-created.command';
import { AuthStore } from '../ports/AuthStore';
import { UserCreatedCommandHandler } from './user-created.command.handler';

describe('Create user command handler tests', () => {
  let authStore: AuthStore;
  let createUserCommandHandler: UserCreatedCommandHandler;

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

    createUserCommandHandler = new UserCreatedCommandHandler(authStore);

    authStore.createUser = jest.fn(() => Promise.resolve(new User()));
  });

  it('should exist', () => {
    expect(authStore).toBeDefined();
    expect(createUserCommandHandler).toBeDefined();
  });

  it('Create valid user', async () => {
    const command = new UserCreatedCommand('12345', 'John Doe', 'mail', 'pass');
    const user = await createUserCommandHandler.execute(command);
    expect(authStore.createUser).toHaveBeenCalledTimes(1);
    expect(user).toBeDefined();
  });
});
