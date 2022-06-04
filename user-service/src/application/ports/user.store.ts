import { Injectable } from '@nestjs/common';
import { Image } from '../../domain/models/Image';
import { Pagination } from '../../domain/models/Pagination';
import { User } from '../../domain/models/User';

@Injectable()
export abstract class UserStore {
  abstract GetUserById(id: string): Promise<User>;
  abstract CreateUser(new_user: User): Promise<User>;
  abstract UpdateUser(user: User): Promise<User>;
  abstract DeleteUser(id: string): Promise<void>;
  abstract SearchUsers(query: string, pagination: Pagination): Promise<User[]>;
  abstract UpdateAvatar(updated_avatar: Image, user_id: string);
}
