import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserStore } from '../../../../application/ports/user.store';
import { User } from '../../../../domain/models/User';

@Injectable()
export class RabbitMQStore implements UserStore {
  constructor(@Inject('POST_SERVICE') readonly client: ClientProxy) {}

  async getUserById(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.client.send({ cmd: 'get-user' }, id).subscribe((user) => {
        resolve(user as User);
      });
    });
  }
}
