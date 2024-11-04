import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/primary/users.controller';
import { UsersRepository } from './infrastructure/secondary/users.repository';
import { UsersRepositoryPort } from './domain/users.repository.port';

@Module({
  controllers: [UsersController],
  providers: [{ provide: UsersRepositoryPort, useClass: UsersRepository }],
})
export class UsersModule {}
