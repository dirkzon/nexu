import { Inject, Injectable } from '@nestjs/common';
import { UserStore } from '../../../application/ports/user.store';
import { User } from '../../../domain/models/User';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQUserStore implements UserStore {
  constructor(@Inject('COMMENT_SERVICE') readonly client: ClientProxy) {}

  async getUserById(id: string): Promise<User> {
    return new Promise((resolve) => {
      this.client.send({ cmd: 'get-user' }, id).subscribe((user) => {
        resolve(user as User);
      });
    });
  }
}
