import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateAvatarCommand } from '../commands/update-avatar.command';
import { UserStore } from '../ports/user.store';
import { UpdateAvatarCommandHandler } from './update-avatar.command.handler';

describe('Update avatar command handler tests', () => {
  let userStore: UserStore;
  let updateAvatarCommandHandler: UpdateAvatarCommandHandler;

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

    updateAvatarCommandHandler = new UpdateAvatarCommandHandler(userStore);

    userStore.UpdateAvatar = jest.fn(() => Promise.resolve());
  });

  it('should exist', () => {
    expect(userStore).toBeDefined();
    expect(updateAvatarCommandHandler).toBeDefined();
  });

  it('update avatar with valid id', async () => {
    const command: UpdateAvatarCommand = {
      id: '12345',
      userId: '54321',
      height: 300,
      width: 300,
      url: 'url',
    };
    await updateAvatarCommandHandler.execute(command);
    expect(userStore.UpdateAvatar).toHaveBeenCalledTimes(1);
  });

  it('Update avatar with invalid id', async () => {
    expect.assertions(1);
    try {
      const command = new UpdateAvatarCommand('', '54321', 300, 300, 'url');
      await updateAvatarCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('id should not be empty');
    }
  });

  it('Update avatar with invalid user id', async () => {
    expect.assertions(1);
    try {
      const command = new UpdateAvatarCommand('12345', '', 300, 300, 'url');
      await updateAvatarCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('userId should not be empty');
    }
  });

  it('Update avatar with invalid url', async () => {
    expect.assertions(1);
    try {
      const command = new UpdateAvatarCommand('12345', '54321', 300, 300, '');
      await updateAvatarCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('url should not be empty');
    }
  });
});
