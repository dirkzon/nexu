import { Image } from './Image';
import { User } from './User';

export class PostOutput {
  id: string;
  description: string;
  createdAt: Date;
  createdBy: User;
  images: Image[];
  totalLikes: number;
  liked: boolean;
}
