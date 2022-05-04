import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserEntity } from './models/user.schema';
import { User } from '../../../domain/models/User';
import { UserStore } from '../../../application/ports/user.store';
import { Pagination } from '../../../domain/models/Pagination';

@Injectable()
export class MongoUserStore implements UserStore {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly model: Model<UserDocument>,
  ) {}

  async SearchUsers(query: string, pagination: Pagination): Promise<User[]> {
    return this.model
      .find({ name: { $regex: query, $options: 'i' } })
      .skip(pagination.from)
      .limit(pagination.first);
  }

  async DeleteUser(id: string): Promise<void> {
    await this.model.findOneAndRemove({ id: id });
    return Promise.resolve(undefined);
  }

  async UpdateUser(user: User): Promise<User> {
    return Promise.resolve(
      await this.model.findOneAndUpdate({ id: user.id }, user, { new: true }),
    );
  }

  async CreateUser(new_user: User): Promise<User> {
    const user = new this.model(new_user);
    return Promise.resolve(await user.save());
  }

  async GetUserById(id: string): Promise<User> {
    return Promise.resolve(await this.model.findOne({ id: id }));
  }
}
