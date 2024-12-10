import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TasksService } from '../domain/tasks.service';
import { UsersRepository } from '../../users/infrastructure/secondary/users.repository';

@Injectable()
export class FindAllTasksByUserUseCase {
  constructor(
    private tasksService: TasksService,
    private usersRepository: UsersRepository,
  ) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findOne(userId);
    if (!user) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    return this.tasksService.findAllByUserId(userId);
  }
}
