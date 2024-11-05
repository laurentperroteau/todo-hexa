import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UsersRepositoryPort } from '../../domain/users.repository.port';
import { User } from '../../domain/user.model';

const users: UserEntity[] = [];

@Injectable()
export class UsersRepository implements UsersRepositoryPort {
  async create(userToCreate: Omit<User, 'id'>): Promise<void> {
    const userEntity = new UserEntity({
      ...userToCreate,
      id: randomUUID(),
    });
    users.push(userEntity);
    return Promise.resolve();
  }

  async findAll(): Promise<User[]> {
    const usersEntities = await Promise.resolve(users);
    return usersEntities.map(UserEntity.toDomain);
  }

  async findOne(id: string): Promise<User | undefined> {
    const user = await users.find((user) => user.id === id);
    return UserEntity.toDomain(user);
  }
}
