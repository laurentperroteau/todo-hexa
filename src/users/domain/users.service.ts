import { Injectable } from '@nestjs/common';
import { UsersRepositoryPort } from './users.repository.port';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepositoryPort) {}

  create(userToCreate: Omit<User, 'id'>) {
    return this.usersRepository.create(userToCreate);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }
}
