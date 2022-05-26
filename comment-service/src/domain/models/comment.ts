import { User } from './User';

export class Comment {
  createdAt: Date;
  comment: string;
  createdBy: User;
  postId: string;
  id: string;
}
