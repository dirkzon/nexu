import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { User } from '../../domain/models/User';
import { UpdateUserCommand } from '../commands/update-user.command';
import { UserStore } from '../ports/user.store';
import { UpdateUserCommandHandler } from './update-user-command.handler';

describe('Create user command handler tests', () => {
  let userStore: UserStore;
  let eventBusSpy: jest.SpyInstance;
  let updateUserCommandHandler: UpdateUserCommandHandler;

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

    updateUserCommandHandler = new UpdateUserCommandHandler(
      userStore,
      eventBus,
    );

    userStore.UpdateUser = jest.fn(() => Promise.resolve(new User()));
    userStore.GetUserById = jest.fn(() => Promise.resolve(new User()));
  });

  it('should exist', () => {
    expect(userStore).toBeDefined();
    expect(updateUserCommandHandler).toBeDefined();
  });

  it('Update valid user', async () => {
    const command = new UpdateUserCommand(
      '12345',
      'John Doe',
      'this is my bio',
    );
    const user = await updateUserCommandHandler.execute(command);
    expect(userStore.UpdateUser).toHaveBeenCalledTimes(1);
    expect(eventBusSpy).toHaveBeenCalledTimes(1);
    expect(user).toBeDefined();
  });

  it('Update user without id', async () => {
    expect.assertions(1);
    try {
      const command = new UpdateUserCommand(
        '',
        'email@mail.com',
        'this is my bio',
      );
      await updateUserCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('id should not be empty');
    }
  });

  it('Update user with too short name', async () => {
    expect.assertions(1);
    try {
      const command = new UpdateUserCommand('12345', 'a', 'this is my bio');
      await updateUserCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual(
        'name must be longer than or equal to 2 characters',
      );
    }
  });

  it('Update user with too long name', async () => {
    expect.assertions(1);
    try {
      const command = new UpdateUserCommand(
        '12345',
        'aaaaaaaaaaaaaaaaaaaaaaa',
        'this is my bio',
      );
      await updateUserCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual(
        'name must be shorter than or equal to 20 characters',
      );
    }
  });

  it('Update user with too long bio', async () => {
    expect.assertions(1);
    try {
      const command = new UpdateUserCommand(
        '12345',
        'John Doe',
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      );
      await updateUserCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual(
        'bio must be shorter than or equal to 60 characters',
      );
    }
  });
});
