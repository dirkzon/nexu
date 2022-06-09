import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { SetLikeCommand } from '../commands/set-like.command';
import { PostStore } from '../ports/post.store';
import { SetLikeCommandHandler } from './set-like.command.handler';

describe('Set like command handler tests', () => {
  let postStore: PostStore;
  let setLikeCommandHandler: SetLikeCommandHandler;

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

    setLikeCommandHandler = new SetLikeCommandHandler(postStore);

    postStore.SetLike = jest.fn(() => {
      return Promise.resolve({
        id: '',
        images: [],
        createdBy: {
          name: '',
          id: '',
          createdAt: null,
          avatar: null,
        },
        description: '',
        totalLikes: 10,
        createdAt: null,
      });
    });
  });

  it('should exist', () => {
    expect(postStore).toBeDefined();
    expect(SetLikeCommandHandler).toBeDefined();
  });

  it('like valid post', async () => {
    postStore.HasUserLiked = jest.fn(() => Promise.resolve(false));
    const command = new SetLikeCommand(true, '54321', '12345');
    await setLikeCommandHandler.execute(command);
    expect(postStore.SetLike).toHaveBeenCalledTimes(1);
  });

  it('Set like with post alreadly liked', async () => {
    expect.assertions(1);
    try {
      postStore.HasUserLiked = jest.fn(() => Promise.resolve(true));
      const command = new SetLikeCommand(true, '54321', '12345');
      await setLikeCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('Post is already liked');
    }
  });

  it('Set like with invalid post id', async () => {
    expect.assertions(1);
    try {
      const command = new SetLikeCommand(true, '', '12345');
      await setLikeCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('postId should not be empty');
    }
  });

  it('Set like with invalid user id', async () => {
    expect.assertions(1);
    try {
      const command = new SetLikeCommand(true, '54321', '');
      await setLikeCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('likedBy should not be empty');
    }
  });
});
