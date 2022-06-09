import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { Post } from '../../domain/models/Post';
import { User } from '../../domain/models/User';
import { CreatePostCommand } from '../commands/create-post.command';
import { PostStore } from '../ports/post.store';
import { UserStore } from '../ports/user.store';
import { CreatePostCommnandHandler } from './create-post.command.handler';

describe('Delete user command handler tests', () => {
  let userStore: UserStore;
  let postStore: PostStore;
  let eventBusSpy: jest.SpyInstance;
  let createPostCommandHandler: CreatePostCommnandHandler;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: UserStore,
          useFactory: () => jest.fn(),
        },
        {
          provide: PostStore,
          useFactory: () => jest.fn(),
        }
      ],
    }).compile();

    userStore = module.get<UserStore>(UserStore);
    postStore = module.get<PostStore>(PostStore);
    const eventBus = module.get<EventBus>(EventBus);
    eventBusSpy = jest.spyOn(eventBus, 'publish');

    createPostCommandHandler = new CreatePostCommnandHandler(
      postStore,
      userStore,
      eventBus,
    );

    userStore.getUserById = jest.fn(() => Promise.resolve(new User()));
    postStore.CreatePost = jest.fn(() => Promise.resolve(new Post()));
  });

  it('should exist', () => {
    expect(userStore).toBeDefined();
    expect(postStore).toBeDefined();
    expect(createPostCommandHandler).toBeDefined();
  });

  it('Create valid post', async () => {
    const command = new CreatePostCommand('12345', 'description');
    await createPostCommandHandler.execute(command);
    expect(userStore.getUserById).toHaveBeenCalledTimes(1);
    expect(postStore.CreatePost).toHaveBeenCalledTimes(1);
    expect(eventBusSpy).toHaveBeenCalledTimes(1);
  });

  it('Create post with invalid id', async () => {
    expect.assertions(1);
    try {
      const command = new CreatePostCommand('', 'description');
      await createPostCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('createdBy should not be empty');
    }
  });

  it('Create post with too short description', async () => {
    expect.assertions(1);
    try {
      const command = new CreatePostCommand('12345', 'a');
      await createPostCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual(
        'description must be longer than or equal to 5 characters',
      );
    }
  });

  it('Create post with too long description', async () => {
    expect.assertions(1);
    try {
      const command = new CreatePostCommand('12345', 'a'.repeat(61));
      await createPostCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual(
        'description must be shorter than or equal to 60 characters',
      );
    }
  });
});
