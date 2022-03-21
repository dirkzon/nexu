import { Image } from './Image';

export class Post {
  id: string;
  description: string;
  createdAt: Date;
  createdBy: string;
  images: Image[];
}
