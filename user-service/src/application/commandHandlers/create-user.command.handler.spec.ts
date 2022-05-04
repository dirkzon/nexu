import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { User } from '../../domain/models/User';
import { CreateUserCommand } from '../commands/create-user.command';
import { UserStore } from '../ports/user.store';
import { CreateUserCommandHandler } from './create-user.command.handler';

describe('Create user command handler tests', () => {
  let userStore: UserStore;
  let eventBusSpy: jest.SpyInstance;
  let createUserCommandHandler: CreateUserCommandHandler;

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

    createUserCommandHandler = new CreateUserCommandHandler(
      userStore,
      eventBus,
    );

    userStore.CreateUser = jest.fn(() => Promise.resolve(new User()));
  });

  it('should exist', () => {
    expect(userStore).toBeDefined();
    expect(createUserCommandHandler).toBeDefined();
  });

  it('Create valid user', async () => {
    const command = new CreateUserCommand(
      'John Doe',
      'email@mail.com',
      'this is my bio',
      'password123!',
    );
    const user = await createUserCommandHandler.execute(command);
    expect(userStore.CreateUser).toHaveBeenCalledTimes(1);
    expect(eventBusSpy).toHaveBeenCalledTimes(1);
    expect(user).toBeDefined();
  });

  it('Create user with too short name', async () => {
    expect.assertions(1);
    try {
      const command = new CreateUserCommand(
        '',
        'email@mail.com',
        'this is my bio',
        'password123!',
      );
      await createUserCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual(
        'name must be longer than or equal to 2 characters',
      );
    }
  });

  it('Create user with too long name', async () => {
    expect.assertions(1);
    try {
      const command = new CreateUserCommand(
        'aaaaaaaaaaaaaaaaaaaaa',
        'email@mail.com',
        'this is my bio',
        'password123!',
      );
      await createUserCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual(
        'name must be shorter than or equal to 20 characters',
      );
    }
  });

  it('Create user without email', async () => {
    expect.assertions(1);
    try {
      const command = new CreateUserCommand(
        'John Doe',
        '',
        'this is my bio',
        'password123!',
      );
      await createUserCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('email should not be empty');
    }
  });

  it('Create user with too long bio', async () => {
    expect.assertions(1);
    try {
      const command = new CreateUserCommand(
        'John Doe',
        'email@mail.com',
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        'password123!',
      );
      await createUserCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual(
        'bio must be shorter than or equal to 60 characters',
      );
    }
  });

  it('Create user without password', async () => {
    expect.assertions(1);
    try {
      const command = new CreateUserCommand(
        'John Doe',
        'email@mail.com',
        'this is my bio',
        '',
      );
      await createUserCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('password should not be empty');
    }
  });
});
