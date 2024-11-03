import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

const users: UserEntity[] = [];

@Injectable()
export class UsersRepository {
  async create(createUserDto: CreateUserDto): Promise<void> {
    users.push({ ...createUserDto, id: randomUUID() });
    return Promise.resolve();
  }

  findAll(): Promise<UserEntity[]> {
    return Promise.resolve(users);
  }

  findOne(id: string): Promise<UserEntity | undefined> {
    return Promise.resolve(users.find((user) => user.id === id));
  }
}
