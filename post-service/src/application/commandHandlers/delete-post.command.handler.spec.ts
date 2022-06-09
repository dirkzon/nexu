import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { deletePostCommand } from '../commands/delete-post.command';
import { PostStore } from '../ports/post.store';
import { deletePostCommandHandler } from './delete-post.command.handler';

describe('Delete user command handler tests', () => {
  let postStore: PostStore;
  let eventBusSpy: jest.SpyInstance;
  let removePostCommandHandler: deletePostCommandHandler;

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
    const eventBus = module.get<EventBus>(EventBus);
    eventBusSpy = jest.spyOn(eventBus, 'publish');

    removePostCommandHandler = new deletePostCommandHandler(
      postStore,
      eventBus,
    );

    postStore.GetPostById = jest.fn(() =>
      Promise.resolve({
        id: '',
        images: [],
        createdBy: {
          name: '',
          id: '12345',
          createdAt: null,
          avatar: null,
        },
        description: '',
        totalLikes: 10,
        createdAt: null,
      }),
    );
    postStore.DeletePost = jest.fn(() => Promise.resolve());
  });

  it('should exist', () => {
    expect(postStore).toBeDefined();
    expect(removePostCommandHandler).toBeDefined();
  });

  it('Delete valid post', async () => {
    const command = new deletePostCommand('12345', '54321');
    await removePostCommandHandler.execute(command);
    expect(postStore.GetPostById).toHaveBeenCalledTimes(1);
    expect(postStore.DeletePost).toHaveBeenCalledTimes(1);
    expect(eventBusSpy).toHaveBeenCalledTimes(1);
  });

  it('Create post with wrong user id', async () => {
    expect.assertions(1);
    try {
      const command = new deletePostCommand('11111', '54321');
      await removePostCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('You do not own this post');
    }
  });

  it('Create post with invalid user id', async () => {
    expect.assertions(1);
    try {
      const command = new deletePostCommand('', '54321');
      await removePostCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('userId should not be empty');
    }
  });

  it('Create post with invalid post id', async () => {
    expect.assertions(1);
    try {
      const command = new deletePostCommand('12345', '');
      await removePostCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('postId should not be empty');
    }
  });
});
