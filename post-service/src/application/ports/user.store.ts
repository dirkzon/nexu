import { Injectable } from '@nestjs/common';
import { User } from '../../domain/models/User';

@Injectable()
export abstract class UserStore {
  abstract getUserById(id: string): Promise<User>;
}
