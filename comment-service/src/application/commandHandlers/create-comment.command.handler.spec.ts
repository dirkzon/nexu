import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { User } from '../../domain/models/User';
import { CreateCommentCommand } from '../commands/create-comment.command';
import { CommentStore } from '../ports/comment.store';
import { UserStore } from '../ports/user.store';
import { CreateCommentCommandHandler } from './create-comment.command.handler';

describe('Create comment command handler tests', () => {
  let commentStore: CommentStore;
  let userStore: UserStore;
  let createCommentCommandHandler: CreateCommentCommandHandler;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: CommentStore,
          useFactory: () => jest.fn(),
        },
        {
          provide: UserStore,
          useFactory: () => jest.fn(),
        },
      ],
    }).compile();

    commentStore = module.get<CommentStore>(CommentStore);
    userStore = module.get<UserStore>(UserStore);

    createCommentCommandHandler = new CreateCommentCommandHandler(
      commentStore,
      userStore,
    );

    commentStore.CreateComment = jest.fn(() => Promise.resolve(new User()));
    userStore.getUserById = jest.fn(() => Promise.resolve(new User()));
  });

  it('should exist', () => {
    expect(commentStore).toBeDefined();
    expect(createCommentCommandHandler).toBeDefined();
  });

  it('Create valid comment', async () => {
    const command = new CreateCommentCommand('comment', '12345', '54321');
    await createCommentCommandHandler.execute(command);
    expect(commentStore.CreateComment).toHaveBeenCalledTimes(1);
  });

  it('Create comment without name', async () => {
    expect.assertions(1);
    try {
      const command = new CreateCommentCommand('', '12345', '54321');
      await createCommentCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('comment should not be empty');
    }
  });

  it('Create comment without post id', async () => {
    expect.assertions(1);
    try {
      const command = new CreateCommentCommand('comment', '', '54321');
      await createCommentCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('postId should not be empty');
    }
  });

  it('Create comment without user id', async () => {
    expect.assertions(1);
    try {
      const command = new CreateCommentCommand('comment', '12345', '');
      await createCommentCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('createdBy should not be empty');
    }
  });
});
