import { Module } from '@nestjs/common';
import { UsersService } from './domain/users.service';
import { UsersController } from './infrastructure/primary/users.controller';
import { UsersRepository } from './infrastructure/secondary/users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
