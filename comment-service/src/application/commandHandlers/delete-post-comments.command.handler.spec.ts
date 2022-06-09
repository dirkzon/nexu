import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { DeletePostCommentsCommand } from '../commands/delete-post-comments.command';
import { CommentStore } from '../ports/comment.store';
import { DeletePostCommentsCommandHandler } from './delete-post-comments.command.handler';

describe('Delete comments from post command handler tests', () => {
  let commentStore: CommentStore;
  let deletePostCommentsCommandHandler: DeletePostCommentsCommandHandler;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: CommentStore,
          useFactory: () => jest.fn(),
        },
      ],
    }).compile();

    commentStore = module.get<CommentStore>(CommentStore);

    deletePostCommentsCommandHandler = new DeletePostCommentsCommandHandler(
      commentStore,
    );

    commentStore.DeletePostComments = jest.fn(() => Promise.resolve());
  });

  it('should exist', () => {
    expect(commentStore).toBeDefined();
    expect(deletePostCommentsCommandHandler).toBeDefined();
  });

  it('Create valid comment', async () => {
    const command = new DeletePostCommentsCommand('12345');
    await deletePostCommentsCommandHandler.execute(command);
    expect(commentStore.DeletePostComments).toHaveBeenCalledTimes(1);
  });

  it('Create comment without id', async () => {
    expect.assertions(1);
    try {
      const command = new DeletePostCommentsCommand('');
      await deletePostCommentsCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('postId should not be empty');
    }
  });
});
