import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/primary/users.controller';
import { UsersRepository } from './infrastructure/secondary/users.repository';
import { UsersRepositoryPort } from './domain/users.repository.port';
import { CreateUserUseCase } from './application/createUser.useCase';
import { GetUsersUseCase } from './application/getUsers.useCase';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    GetUsersUseCase,
    { provide: UsersRepositoryPort, useClass: UsersRepository },
  ],
  exports: [UsersRepositoryPort],
})
export class UsersModule {}
