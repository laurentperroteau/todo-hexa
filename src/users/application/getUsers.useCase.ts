import { Injectable } from '@nestjs/common';
import { UsersService } from '../domain/users.service';
import { UsersRepositoryPort } from '../domain/users.repository.port';

@Injectable()
export class GetUsersUseCase {
  private readonly usersService: UsersService;

  constructor(private readonly usersRepository: UsersRepositoryPort) {
    this.usersService = new UsersService(usersRepository);
  }

  getOne(id: string) {
    return this.usersService.findOne(id);
  }

  getAll() {
    return this.usersService.findAll();
  }
}
